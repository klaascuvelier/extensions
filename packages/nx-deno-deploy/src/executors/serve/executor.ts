import { ExecutorContext } from '@nrwl/tao/src/shared/workspace';
import { FsTree } from '@nrwl/tao/src/shared/tree';
import { readProjectConfiguration } from '@nrwl/devkit';
import { runProject } from '../../lib/deploy-ctl';

export default async function serveExecutor(
    options: any,
    context: ExecutorContext
) {
    const { projectName, target } = context;
    const tree = new FsTree(process.cwd(), false);
    const projectConfiguration = readProjectConfiguration(tree, projectName);

    const sourceRoot = projectConfiguration.sourceRoot;
    const mainFile = target.options.mainFile;
    const flags = target.options.flags ?? [];

    return runProject(mainFile, sourceRoot, flags);
}
