import {
    readProjectConfiguration,
    Tree,
    updateProjectConfiguration,
} from '@nx/devkit';
import { AddDeployTargetGeneratorSchema } from './schema';

export default async function (
    tree: Tree,
    options: AddDeployTargetGeneratorSchema
) {
    try {
        console.log("Adding 'deploy' target to " + options.appName);
        const projectConfiguration = readProjectConfiguration(
            tree,
            options.appName
        );
        const outputPath =
            options.outputPath ??
            projectConfiguration.targets['build']['options']['outputPath'];

        projectConfiguration.targets = {
            ...projectConfiguration.targets,
            deploy: {
                executor: '@k11r/nx-netlify-deploy:deploy',
                options: {
                    siteId: options.siteId,
                    outputPath,
                },
            },
        };
        updateProjectConfiguration(tree, options.appName, projectConfiguration);
    } catch (e) {
        console.error(e);
    }
}
