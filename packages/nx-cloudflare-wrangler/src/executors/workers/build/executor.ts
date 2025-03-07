import { ExecutorContext, joinPathFragments, workspaceRoot } from '@nx/devkit';
import { execSync } from 'child_process';
import { WorkerBuildExecutorSchema } from './schema';

export default async function buildExecutor(
    options: WorkerBuildExecutorSchema,
    context: ExecutorContext,
) {
    try {
        const buildTarget =
            context.projectsConfigurations.projects[context.projectName].targets
                .build;

        const wranglerConfigFile = joinPathFragments(
            workspaceRoot,
            buildTarget.options.wranglerConfig,
        );

        const outputPath = joinPathFragments(
            workspaceRoot,
            buildTarget.options.outputPath,
        );
        const entryFile = joinPathFragments(
            workspaceRoot,
            buildTarget.options.main,
        );
        const tsconfigPath = joinPathFragments(
            workspaceRoot,
            buildTarget.options.tsConfig,
        );

        execSync(`rm -rf ${outputPath} || true`);
        execSync(`mkdir -p ${outputPath}`);
        execSync(
            `esbuild --bundle --outdir=${outputPath} --tsconfig=${tsconfigPath} --platform=neutral ${entryFile}`,
        );
        execSync(`cp ${wranglerConfigFile} ${outputPath}`);
    } catch (e) {
        console.error(e);

        return {
            success: false,
            message: 'Could not build project: ' + e.message,
        };
    }

    return { success: true };
}
