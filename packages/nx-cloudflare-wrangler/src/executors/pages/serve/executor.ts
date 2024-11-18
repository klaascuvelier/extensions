import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import { resolve } from 'path';
import { runWranglerCommandForProject } from '../../wrangler';
import { PagesServeExecutorSchema } from './schema';

export default async function deployExecutor(
    options: PagesServeExecutorSchema,
    context: ExecutorContext,
) {
    if (options.dist) {
        options.dist = resolve(process.cwd(), options.dist);
    }
    const dist = joinPathFragments(
        process.cwd(),
        context.projectsConfigurations.projects[context.projectName].targets
            .build.options.outputPath,
    );

    const deployOptions = {
        dist,
        ...options,
    };

    return runWranglerCommandForProject(deployOptions, context, 'pages dev');
}
