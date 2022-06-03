import { ExecutorContext } from '@nrwl/devkit';
import { RemoveExecutorSchema } from './schema';
import { runSstCommandForProject } from '../sst';

export default async function removeExecutor(
    options: RemoveExecutorSchema,
    context: ExecutorContext
) {
    return runSstCommandForProject(options, context, 'remove');
}
