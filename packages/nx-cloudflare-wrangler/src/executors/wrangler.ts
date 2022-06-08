import {
    ExecutorContext,
    joinPathFragments,
    readProjectConfiguration,
    workspaceRoot,
} from '@nrwl/devkit';
import { WorkerServeExecutorSchema } from './workers/serve/schema';
import { WorkerDeployExecutorSchema } from './workers/deploy/schema';
import { FsTree } from '@nrwl/tao/src/shared/tree';
import { execSync } from 'child_process';
import { PagesDeployExecutorSchema } from './pages/deploy/schema';

export function runWranglerCommandForProject(
    options:
        | WorkerServeExecutorSchema
        | WorkerDeployExecutorSchema
        | PagesDeployExecutorSchema,
    context: ExecutorContext,
    command: 'dev' | 'publish' | 'pages publish'
) {
    const { projectName, target } = context;
    const executorOptions = target.options ?? {};

    const tree = new FsTree(process.cwd(), false);
    const projectConfiguration = readProjectConfiguration(tree, projectName);

    const wranglerOptions = [];

    if (command === 'pages publish') {
        wranglerOptions.push((options as PagesDeployExecutorSchema).dist);
        wranglerOptions.push(
            '--project-name="' +
                ((options as PagesDeployExecutorSchema).projectName ??
                    projectName) +
                '"'
        );
        wranglerOptions.push(
            '--branch="' + (options as PagesDeployExecutorSchema).branch + '"'
        );
        wranglerOptions.push(
            '--commit-hash=' + (options as PagesDeployExecutorSchema).commitHash
        );
        wranglerOptions.push(
            '--commit-message="' +
                (options as PagesDeployExecutorSchema).commitMessage +
                '"'
        );
        wranglerOptions.push(
            '--commit-dirty=' +
                ((options as PagesDeployExecutorSchema).commitDirty
                    ? 'true'
                    : 'false')
        );
    } else if (command === 'publish') {
        wranglerOptions.push(
            joinPathFragments(
                workspaceRoot,
                projectConfiguration.targets.build.options.outputPath,
                'index.js'
            )
        );
    }

    return new Promise((resolve) => {
        try {
            console.log(`wrangler ${command} ${wranglerOptions.join(' ')}`);
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
