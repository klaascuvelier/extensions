import { ExecutorContext } from '@nrwl/devkit';
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

    const command = `npx netlify deploy --dir=${outputPath} --site=${siteId} ${
        prod ? '--prod' : ''
    }`;

    try {
        execSync(command);
    } catch (e) {
        return { success: false, error: e.toString() };
    }

    return { success: true };
}
