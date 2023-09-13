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
        const { appName, mainFile, denoProject } = options;

        console.log('Adding serve, test and deploy target to ' + appName);
        const projectConfiguration = readProjectConfiguration(tree, appName);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { build, ...targets } = projectConfiguration.targets;

        projectConfiguration.targets = {
            ...targets,
            serve: {
                executor: '@k11r/nx-deno-deploy:serve',
                options: {
                    mainFile,
                    flags: [],
                },
            },
            test: {
                executor: '@k11r/nx-deno-deploy:test',
            },
            lint: {
                executor: '@k11r/nx-deno-deploy:lint',
            },
            deploy: {
                executor: '@k11r/nx-deno-deploy:deploy',
                options: {
                    mainFile,
                    ...(denoProject?.length > 0 ? { denoProject } : null),
                },
            },
        };
        updateProjectConfiguration(tree, options.appName, projectConfiguration);
    } catch (e) {
        console.error(e);
    }
}
