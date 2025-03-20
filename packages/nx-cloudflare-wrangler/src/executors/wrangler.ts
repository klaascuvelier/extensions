import {
    ExecutorContext,
    joinPathFragments,
    readProjectConfiguration,
    workspaceRoot,
} from '@nx/devkit';
import { spawn } from 'child_process';
import { FsTree } from 'nx/src/generators/tree';
import { PagesDeployExecutorSchema } from './pages/deploy/schema';
import { WorkerDeployExecutorSchema } from './workers/deploy/schema';
import { WorkerServeExecutorSchema } from './workers/serve/schema';

export function runWranglerCommandForProject(
    options:
        | WorkerServeExecutorSchema
        | WorkerDeployExecutorSchema
        | PagesDeployExecutorSchema,
    context: ExecutorContext,
    command: 'dev' | 'deploy' | 'pages deploy' | 'pages dev',
) {
    const { projectName } = context;

    const tree = new FsTree(process.cwd(), false);
    const projectConfiguration = readProjectConfiguration(tree, projectName);

    const wranglerOptions = [];

    if (command === 'pages deploy') {
        wranglerOptions.push((options as PagesDeployExecutorSchema).dist);
        wranglerOptions.push(
            '--project-name="' +
                ((options as PagesDeployExecutorSchema).projectName ??
                    projectName) +
                '"',
        );
        wranglerOptions.push(
            '--branch="' + (options as PagesDeployExecutorSchema).branch + '"',
        );
        wranglerOptions.push(
            '--commit-hash=' +
                (options as PagesDeployExecutorSchema).commitHash,
        );
        wranglerOptions.push(
            '--commit-message="' +
                (options as PagesDeployExecutorSchema).commitMessage +
                '"',
        );
        wranglerOptions.push(
            '--commit-dirty=' +
                ((options as PagesDeployExecutorSchema).commitDirty
                    ? 'true'
                    : 'false'),
        );
    } else if (command === 'pages dev') {
        wranglerOptions.push((options as PagesDeployExecutorSchema).dist);
    } else if (command === 'deploy') {
        // no extra optiones needed
    } else if (command === 'dev') {
        wranglerOptions.push(
            joinPathFragments(
                workspaceRoot,
                projectConfiguration.targets.build.options.main,
            ),
        );
    }

    return new Promise((resolve) => {
        try {
            console.log(`npx wrangler ${command} ${wranglerOptions.join(' ')}`);
            const childProcess = spawn(
                'npx',
                ['wrangler', command, ...wranglerOptions],
                {
                    cwd: projectConfiguration.root,
                    stdio: 'inherit',
                    shell: true,
                },
            );

            childProcess.on('error', (error) => {
                resolve({ success: false, message: error });
            });

            childProcess.on('exit', (code) => {
                if (code === 0) {
                    resolve({ success: true });
                } else {
                    resolve({
                        success: false,
                        message: `Process exited with code ${code}`,
                    });
                }
            });
        } catch (e) {
            resolve({ success: false, message: e });
        }
    });
}
