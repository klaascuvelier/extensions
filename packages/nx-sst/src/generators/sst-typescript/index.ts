import {
    formatFiles,
    generateFiles,
    installPackagesTask,
    joinPathFragments,
    names,
    readProjectConfiguration,
    Tree,
    updateProjectConfiguration,
} from '@nx/devkit';
import { applicationGenerator } from '@nx/node';
import { CreateSstProjectSchema } from './schema';

const SST_OPTION_MAP = {
    profile: 'profile',
    stage: 'stage',
    region: 'region',
    'role-arn': 'roleArn',
};

export default async function projectGenerator(
    tree: Tree,
    schema: CreateSstProjectSchema
) {
    await applicationGenerator(tree, schema);

    const appName =
        (schema.directory ? `${schema.directory}-` : '') + schema.name;
    const projectConfiguration = readProjectConfiguration(tree, appName);
    const projectRoot = projectConfiguration.root;

    const sstOptions: Record<string, string> = Object.keys(
        SST_OPTION_MAP
    ).reduce((acc, optionKey) => {
        const schemaKey = SST_OPTION_MAP[optionKey];
        if (schema[schemaKey]?.length > 0) {
            acc[optionKey] = schemaKey[schemaKey];
        }

        return acc;
    }, {});

    const templatePath = joinPathFragments(__dirname, './files');
    const substitutions = {
        tmpl: '', // remove __tmpl__ from filenames
        region: sstOptions.region ?? 'eu-central-1',
        ...names(schema.name),
    };

    // remove all files that were created except for the config files
    tree.listChanges()
        .filter(
            (fileChange) =>
                fileChange.type === 'CREATE' &&
                !fileChange.path.endsWith('/project.json') &&
                !fileChange.path.endsWith('.eslintrc.json') &&
                fileChange.path !== 'workspace.json'
        )
        .forEach((fileChange) => {
            tree.delete(fileChange.path);
        });

    generateFiles(tree, templatePath, projectRoot, substitutions);

    await formatFiles(tree);
    updateGitIgnore(tree);
    addTargets(tree, schema.name, sstOptions);

    return () => {
        installPackagesTask(tree);
    };
}

function addTargets(
    tree: Tree,
    appName: string,
    sstOptions: Record<string, string>
) {
    try {
        const projectConfiguration = readProjectConfiguration(tree, appName);
        const options =
            Object.keys(sstOptions).length > 0 ? { options: sstOptions } : null;

        projectConfiguration.targets = {
            serve: {
                executor: '@k11r/nx-sst:serve',
                ...options,
            },
            test: {
                executor: '@k11r/nx-sst:test',
                ...options,
            },
            deploy: {
                executor: '@k11r/nx-sst:deploy',
                ...options,
            },
            remove: {
                executor: '@k11r/nx-sst:remove',
                ...options,
            },
            lint: projectConfiguration.targets.lint,
        };

        updateProjectConfiguration(tree, appName, projectConfiguration);
    } catch (e) {
        console.error(e);
    }
}

function updateGitIgnore(tree: Tree) {
    const requiredIgnores = ['.build', '.sst'];

    try {
        const content = tree.exists('.gitignore')
            ? tree.read('.gitignore').toString()
            : ``;
        const ignores = content.split(`\n`);
        const ignoresToAdd = requiredIgnores.filter(
            (newIgnore) => !ignores.find((i) => i.trim() === newIgnore.trim())
        );
        tree.write('.gitignore', content + `\n` + ignoresToAdd.join(`\n`));
    } catch (e) {
        console.error(e);
    }
}
