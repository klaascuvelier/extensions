import { ExecutorContext, readProjectConfiguration } from '@nx/devkit';
import { FsTree } from '@nx/tao/src/shared/tree';
import { lintProject } from '../../lib/deploy-ctl';

export default async function lintExecutor(
    options: unknown,
    context: ExecutorContext
) {
    const { projectName } = context;
    const tree = new FsTree(process.cwd(), false);
    const projectConfiguration = readProjectConfiguration(tree, projectName);
    const sourceRoot = projectConfiguration.sourceRoot;

    return lintProject(sourceRoot);
}
