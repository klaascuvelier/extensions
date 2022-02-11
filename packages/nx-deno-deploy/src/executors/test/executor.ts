import { ExecutorContext } from '@nrwl/tao/src/shared/workspace';
import { FsTree } from '@nrwl/tao/src/shared/tree';
import { readProjectConfiguration } from '@nrwl/devkit';
import { testProject } from '../../lib/deploy-ctl';

export default async function testExecutor(
    options: any,
    context: ExecutorContext
) {
    const { projectName } = context;
    const tree = new FsTree(process.cwd(), false);
    const projectConfiguration = readProjectConfiguration(tree, projectName);
    const sourceRoot = projectConfiguration.sourceRoot;

    return testProject(sourceRoot);
}
