import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';
import { PagesDeployExecutorSchema } from './schema';
import { runWranglerCommandForProject } from '../../wrangler';
import { execSync } from 'child_process';
import { resolve } from 'path';

export default async function deployExecutor(
    options: PagesDeployExecutorSchema,
    context: ExecutorContext
) {
    if (options.dist) {
        options.dist = resolve(process.cwd(), options.dist);
    }
    const dist = joinPathFragments(
        process.cwd(),
        context.workspace.projects[context.projectName].targets.build.options
            .outputPath
    );
    const branch = execSync('git rev-parse --abbrev-ref HEAD')
        .toString()
        .trim();
    const commitHash = execSync('git rev-parse HEAD').toString().trim();
    const commitMessage = `deploy ${branch} ${new Date().toISOString()}`;

    const deployOptions = {
        dist,
        branch,
        commitHash,
        commitMessage,
        commitDirty: false,
        ...options,
    };

    return runWranglerCommandForProject(
        deployOptions,
        context,
        'pages publish'
    );
}
