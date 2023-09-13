import { ExecutorContext } from '@nx/devkit';
import { runSstCommandForProject } from '../sst';
import { RemoveExecutorSchema } from './schema';

export default async function removeExecutor(
    options: RemoveExecutorSchema,
    context: ExecutorContext
) {
    return runSstCommandForProject(options, context, 'remove');
}
