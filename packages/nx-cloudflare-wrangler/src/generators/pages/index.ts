import {
    installPackagesTask,
    readProjectConfiguration,
    Tree,
    updateProjectConfiguration,
} from '@nx/devkit';
import { CloudflarePagesProjectSchema } from './schema';

export default async function projectGenerator(
    tree: Tree,
    schema: CloudflarePagesProjectSchema,
) {
    addTargets(
        tree,
        schema.name,
        schema.projectName && schema.projectName.length > 0
            ? { projectName: schema.projectName }
            : {},
    );

    return () => {
        installPackagesTask(tree);
    };
}

function addTargets(
    tree: Tree,
    appName: string,
    cloudflareOptions: Record<string, string>,
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
