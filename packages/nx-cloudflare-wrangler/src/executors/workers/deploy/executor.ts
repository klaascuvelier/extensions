import { ExecutorContext } from '@nrwl/devkit';
import { DeployExecutorSchema } from './schema';
import { runWranglerCommandForProject } from '../../wrangler';

export default async function deployExecutor(
    options: DeployExecutorSchema,
    context: ExecutorContext
) {
    return runWranglerCommandForProject(options, context, 'publish');
}
