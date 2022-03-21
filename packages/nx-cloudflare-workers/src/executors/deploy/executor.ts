import { ExecutorContext } from '@nrwl/tao/src/shared/workspace';
import { DeployExecutorSchema } from './schema';
import { execSync } from 'child_process';

export default async function deployExecutor(
    options: DeployExecutorSchema,
    context: ExecutorContext
) {
    const { siteId, skipBuild, prod, outputPath } = options;

    if (!skipBuild) {
        console.log('Building app currently not supported');
    }

    return { success: true };
}
