import { ExecutorContext } from '@nx/devkit';
import { runWranglerCommandForProject } from '../../wrangler';
import { WorkerServeExecutorSchema } from './schema';

export default async function serveExecutor(
    options: WorkerServeExecutorSchema,
    context: ExecutorContext,
) {
    return runWranglerCommandForProject(options, context, 'dev');
}
