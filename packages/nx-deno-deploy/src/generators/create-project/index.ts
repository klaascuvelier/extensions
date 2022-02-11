import {
    Tree,
    formatFiles,
    installPackagesTask,
    generateFiles,
    joinPathFragments,
    readProjectConfiguration,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/node';
import denoDeployGenerator from '../add-targets/generator';
import { CreateDenoProjectSchema } from './schema';

export default async function (tree: Tree, schema: CreateDenoProjectSchema) {
    await applicationGenerator(tree, schema);

    const appName =
        (schema.directory ? `${schema.directory}-` : '') + schema.name;
    const projectConfiguration = readProjectConfiguration(tree, appName);
    const projectRoot = projectConfiguration.root;
    const mainFile = 'main.ts';

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
    await denoDeployGenerator(tree, {
        mainFile,
        appName,
        denoProject: schema.denoProject ?? '',
    });

    return () => {
        installPackagesTask(tree);
    };
}
