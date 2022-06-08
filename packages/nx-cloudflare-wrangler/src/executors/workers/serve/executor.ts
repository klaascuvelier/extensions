import { ExecutorContext } from '@nrwl/devkit';
import { WorkerServeExecutorSchema } from './schema';
import { runWranglerCommandForProject } from '../../wrangler';

export default async function serveExecutor(
    options: WorkerServeExecutorSchema,
    context: ExecutorContext
) {
    return runWranglerCommandForProject(options, context, 'dev');
}
