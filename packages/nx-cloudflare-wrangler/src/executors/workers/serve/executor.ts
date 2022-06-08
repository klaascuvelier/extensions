import { ExecutorContext } from '@nrwl/devkit';
import { ServeExecutorSchema } from './schema';
import { runWranglerCommandForProject } from '../../wrangler';

export default async function serveExecutor(
    options: ServeExecutorSchema,
    context: ExecutorContext
) {
    return runWranglerCommandForProject(options, context, 'dev');
}
