import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';
import { PagesServeExecutorSchema } from './schema';
import { runWranglerCommandForProject } from '../../wrangler';

export default async function deployExecutor(
    options: PagesServeExecutorSchema,
    context: ExecutorContext
) {
    const dist = joinPathFragments(
        process.cwd(),
        context.workspace.projects[context.projectName].targets.build.options
            .outputPath
    );

    const deployOptions = {
        dist,
        ...options,
    };

    return runWranglerCommandForProject(deployOptions, context, 'pages dev');
}
