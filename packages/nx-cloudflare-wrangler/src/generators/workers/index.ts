import {
    Tree,
    formatFiles,
    installPackagesTask,
    generateFiles,
    joinPathFragments,
    readProjectConfiguration,
    names,
    updateProjectConfiguration,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/node';
import { CloudflareWorkerProjectSchema } from './schema';

export default async function projectGenerator(
    tree: Tree,
    schema: CloudflareWorkerProjectSchema
) {
    await applicationGenerator(tree, schema);

    const appName =
        (schema.directory ? `${schema.directory}-` : '') + schema.name;
    const projectConfiguration = readProjectConfiguration(tree, appName);
    const projectRoot = projectConfiguration.root;

    const templatePath = joinPathFragments(__dirname, './files');
    const substitutions = {
        tmpl: '', // remove __tmpl__ from filenames
        zone_id: schema.zone_id ?? '',
        account_id: schema.account_id ?? '',
        route: schema.route ?? '',
        workers_dev: schema.route ?? true,
        compatibility_date: new Date().toISOString().split('T')[0],
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
    addTargets(tree, schema.name);

    return () => {
        installPackagesTask(tree);
    };
}

function addTargets(tree: Tree, appName: string) {
    try {
        const projectConfiguration = readProjectConfiguration(tree, appName);
        const packageRoot = projectConfiguration.root;
        const packageSourceRoot = projectConfiguration.sourceRoot;

        projectConfiguration.targets = {
            ...(projectConfiguration.targets ?? {}),
            serve: {
                executor: '@k11r/nx-cloudflare-wrangler:serve-worker',
            },

            deploy: {
                executor: '@k11r/nx-cloudflare-wrangler:deploy-worker',
            },
            build: {
                executor: '@k11r/nx-cloudflare-wrangler:build-worker',
                options: {
                    outputPath: `dist/packages/${appName}`,
                    tsConfig: `${packageRoot}/tsconfig.json`,
                    packageJson: `${packageRoot}/package.json`,
                    main: `${packageSourceRoot}/index.ts`,
                },
            },
        };

        updateProjectConfiguration(tree, appName, projectConfiguration);
    } catch (e) {
        console.error(e);
    }
}

function updateGitIgnore(tree: Tree) {
    const requiredIgnores = ['.dist'];

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
