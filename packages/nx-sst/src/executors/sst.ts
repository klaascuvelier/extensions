import { execSync } from 'child_process';
import { ServeExecutorSchema } from './serve/schema';
import { ExecutorContext, readProjectConfiguration } from '@nrwl/devkit';
import { FsTree } from '@nrwl/tao/src/shared/tree';

export type sstCommand = 'start' | 'test' | 'deploy' | 'remove';
export const SST_OPTION_KEYS = ['profile', 'stage', 'region', 'role-arn'];

export function runSstCommandForProject(
    options: ServeExecutorSchema,
    context: ExecutorContext,
    command: sstCommand
): Promise<{ success: boolean; message?: string }> {
    const { projectName, target } = context;
    const executorOptions = target.options ?? {};

    const tree = new FsTree(process.cwd(), false);
    const projectConfiguration = readProjectConfiguration(tree, projectName);

    const sstOptions = Object.keys(executorOptions).reduce((acc, option) => {
        if (SST_OPTION_KEYS.includes(option)) {
            acc.push(`--${option}=${executorOptions[option]}`);
        }

        return acc;
    }, []);

    return new Promise((resolve) => {
        try {
            execSync(`sst ${command} ${sstOptions.join(' ')}`, {
                cwd: projectConfiguration.root,
                stdio: 'inherit',
            });
            resolve({ success: true });
        } catch (e) {
            resolve({ success: false, message: e });
        }
    });
}
