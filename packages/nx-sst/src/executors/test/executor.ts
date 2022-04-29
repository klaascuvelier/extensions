import { ExecutorContext } from '@nrwl/devkit';
import { TextExecutorSchema } from './schema';
import { runSstCommandForProject } from '../sst';

export default async function testExecutor(
    options: TextExecutorSchema,
    context: ExecutorContext
) {
    return runSstCommandForProject(options, context, 'test');
}
