import { ExecutorContext, readProjectConfiguration } from '@nrwl/devkit';
import { ServeExecutorSchema } from './workers/serve/schema';
import { DeployExecutorSchema } from './workers/deploy/schema';
import { FsTree } from '@nrwl/tao/src/shared/tree';
import { execSync } from 'child_process';

export function runWranglerCommandForProject(
    options: ServeExecutorSchema | DeployExecutorSchema,
    context: ExecutorContext,
    command: 'dev' | 'publish' | 'pages dev' | 'pages publish'
) {
    const { projectName, target } = context;
    const executorOptions = target.options ?? {};

    const tree = new FsTree(process.cwd(), false);
    const projectConfiguration = readProjectConfiguration(tree, projectName);

    const wranglerOptions = Object.keys(executorOptions).reduce(
        (acc, option) => {
            return acc;
        },
        []
    );

    return new Promise((resolve) => {
        try {
            execSync(`wrangler ${command} ${wranglerOptions.join(' ')}`, {
                cwd: projectConfiguration.root,
                stdio: 'inherit',
            });
            resolve({ success: true });
        } catch (e) {
            resolve({ success: false, message: e });
        }
    });
}
