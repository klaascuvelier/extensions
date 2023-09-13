import { ExecutorContext, readProjectConfiguration } from '@nx/devkit';
import { FsTree } from '@nx/tao/src/shared/tree';
import { deployProject } from '../../lib/deploy-ctl';
import { DeployExecutorSchema } from './schema';

export default async function deployExecutor(
    options: DeployExecutorSchema,
    context: ExecutorContext
) {
    const { projectName, target } = context;
    const { isProd, token } = options;

    const tree = new FsTree(process.cwd(), false);
    const projectConfiguration = readProjectConfiguration(tree, projectName);
    const sourceRoot = projectConfiguration.sourceRoot;
    const { mainFile, denoProject } = target.options;

    return deployProject(
        mainFile,
        sourceRoot,
        denoProject?.length > 0 ? denoProject : projectName,
        isProd ?? false,
        token ?? ''
    );
}
