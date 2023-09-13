import { ExecutorContext } from '@nx/devkit';
import { runSstCommandForProject } from '../sst';
import { TextExecutorSchema } from './schema';

export default async function testExecutor(
    options: TextExecutorSchema,
    context: ExecutorContext
) {
    return runSstCommandForProject(options, context, 'test');
}
