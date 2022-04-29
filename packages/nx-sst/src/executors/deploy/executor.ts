import { ExecutorContext } from '@nrwl/devkit';
import { DeployExecutorSchema } from './schema';
import { runSstCommandForProject } from '../sst';

export default async function deployExecutor(
    options: DeployExecutorSchema,
    context: ExecutorContext
) {
    return runSstCommandForProject(options, context, 'deploy');
}
