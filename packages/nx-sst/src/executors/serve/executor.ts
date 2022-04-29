import { ExecutorContext } from '@nrwl/devkit';
import { ServeExecutorSchema } from './schema';
import { runSstCommandForProject } from '../sst';

export default async function serveExecutor(
    options: ServeExecutorSchema,
    context: ExecutorContext
) {
    return runSstCommandForProject(options, context, 'start');
}
