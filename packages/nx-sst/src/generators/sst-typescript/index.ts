import {
    Tree,
    formatFiles,
    installPackagesTask,
    generateFiles,
    getWorkspaceLayout,
    joinPathFragments,
    readProjectConfiguration,
    names,
    updateProjectConfiguration,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/node';
import { CreateSstProjectSchema } from './schema';

export default async function projectGenerator(
    tree: Tree,
    schema: CreateSstProjectSchema
) {
    await applicationGenerator(tree, schema);

    const appName =
        (schema.directory ? `${schema.directory}-` : '') + schema.name;
    const projectConfiguration = readProjectConfiguration(tree, appName);
    const projectRoot = projectConfiguration.root;

    const templatePath = joinPathFragments(__dirname, './files');
    const substitutions = {
        tmpl: '', // remove __tmpl__ from filenames
        region: schema.awsRegion ?? 'eu-central-1',
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
    addTargets(tree, schema.name, schema.awsProfile);

    console.log(tree.read('.gitignore').toString());
    return () => {
        installPackagesTask(tree);
    };
}

function addTargets(tree: Tree, appName: string, awsProfile?: string) {
    try {
        const projectConfiguration = readProjectConfiguration(tree, appName);
        const options =
            awsProfile?.length > 0
                ? { options: { profile: awsProfile } }
                : null;

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
