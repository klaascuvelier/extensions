import { ExecutorContext } from '@nx/devkit';
import { runWranglerCommandForProject } from '../../wrangler';
import { WorkerDeployExecutorSchema } from './schema';

export default async function deployExecutor(
    options: WorkerDeployExecutorSchema,
    context: ExecutorContext,
) {
    return runWranglerCommandForProject(options, context, 'deploy');
}
