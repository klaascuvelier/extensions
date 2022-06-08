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
import { CloudflarePagesProjectSchema } from './schema';

export default async function projectGenerator(
    tree: Tree,
    schema: CloudflarePagesProjectSchema
) {
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
    addTargets(tree, schema.name, {});

    console.log(tree.read('.gitignore').toString());
    return () => {
        installPackagesTask(tree);
    };
}

function addTargets(
    tree: Tree,
    appName: string,
    cloudflareOptions: Record<string, string>
) {
    try {
        const projectConfiguration = readProjectConfiguration(tree, appName);
        const options =
            Object.keys(cloudflareOptions).length > 0
                ? { options: cloudflareOptions }
                : null;

        projectConfiguration.targets = {
            ...(projectConfiguration.targets ?? {}),
            deploy: {
                executor: '@k11r/nx-cloudflare-wrangler:deploy-page',
                ...options,
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
