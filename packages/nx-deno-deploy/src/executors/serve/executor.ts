import { ExecutorContext, readProjectConfiguration } from '@nx/devkit';
import { FsTree } from '@nx/tao/src/shared/tree';
import { runProject } from '../../lib/deploy-ctl';

export default async function serveExecutor(
    options: unknown,
    context: ExecutorContext
) {
    const { projectName, target } = context;
    const tree = new FsTree(process.cwd(), false);
    const projectConfiguration = readProjectConfiguration(tree, projectName);

    const sourceRoot = projectConfiguration.sourceRoot;
    const mainFile = target.options.mainFile;
    const flags = (target.options.flags ?? []).concat(['--watch']);

    return runProject(mainFile, sourceRoot, flags);
}
