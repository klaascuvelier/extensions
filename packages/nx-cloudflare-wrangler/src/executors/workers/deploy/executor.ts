import { ExecutorContext } from '@nrwl/devkit';
import { WorkerDeployExecutorSchema } from './schema';
import { runWranglerCommandForProject } from '../../wrangler';

export default async function deployExecutor(
    options: WorkerDeployExecutorSchema,
    context: ExecutorContext
) {
    return runWranglerCommandForProject(options, context, 'publish');
}
