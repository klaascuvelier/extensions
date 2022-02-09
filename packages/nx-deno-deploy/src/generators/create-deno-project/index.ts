import {
    Tree,
    formatFiles,
    installPackagesTask,
    generateFiles,
    joinPathFragments,
    readProjectConfiguration,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/node';
import denoDeployGenerator from '../add-deploy-target/generator';
import { CreateDenoProjectSchema } from './schema';

export default async function (tree: Tree, schema: CreateDenoProjectSchema) {
    await applicationGenerator(tree, schema);

    const appName = schema.name;
    const projectConfiguration = readProjectConfiguration(tree, schema.name);
    const projectRoot = projectConfiguration.root;
    const buildTarget = projectConfiguration.targets['build'];
    const outputPath = buildTarget.options.outputPath;
    const entryPath = joinPathFragments(outputPath, 'main.ts');

    // remove all files that were created
    tree.listChanges()
        .filter((fileChange) => fileChange.type === 'CREATE')
        .forEach((fileChange) => {
            tree.delete(fileChange.path);
        });

    generateFiles(tree, joinPathFragments(__dirname, './files'), projectRoot, {
        ...schema,
        tmpl: '',
    });

    await formatFiles(tree);
    await denoDeployGenerator(tree, { entryPath, appName });

    return () => {
        installPackagesTask(tree);
    };
}
