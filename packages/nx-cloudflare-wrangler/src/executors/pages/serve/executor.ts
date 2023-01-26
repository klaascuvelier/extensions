import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';
import { PagesServeExecutorSchema } from './schema';
import { runWranglerCommandForProject } from '../../wrangler';
import { resolve } from 'path';

export default async function deployExecutor(
    options: PagesServeExecutorSchema,
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

    const deployOptions = {
        dist,
        ...options,
    };

    return runWranglerCommandForProject(deployOptions, context, 'pages dev');
}
