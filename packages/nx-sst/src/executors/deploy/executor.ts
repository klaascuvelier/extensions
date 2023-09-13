import { ExecutorContext } from '@nx/devkit';
import { runSstCommandForProject } from '../sst';
import { DeployExecutorSchema } from './schema';

export default async function deployExecutor(
    options: DeployExecutorSchema,
    context: ExecutorContext
) {
    return runSstCommandForProject(options, context, 'deploy');
}
