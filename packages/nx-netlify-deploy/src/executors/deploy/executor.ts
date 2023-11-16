import { execSync } from 'child_process';
import { DeployExecutorSchema } from './schema';

export default async function deployExecutor(options: DeployExecutorSchema) {
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
