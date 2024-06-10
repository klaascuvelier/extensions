import { ExecutorContext } from '@nx/devkit';
import { runSstCommandForProject } from '../sst';
import { ServeExecutorSchema } from './schema';

export default async function serveExecutor(
    options: ServeExecutorSchema,
    context: ExecutorContext,
) {
    return runSstCommandForProject(options, context, 'start');
}
