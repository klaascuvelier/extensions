import { readProjectConfiguration, Tree, updateProjectConfiguration } from '@nrwl/devkit';
import { AddDeployTargetGeneratorSchema } from './schema';

export default async function (tree: Tree, options: AddDeployTargetGeneratorSchema) {
  try {
    console.log("Adding 'deploy' target to " + options.appName);
    const projectConfiguration = readProjectConfiguration(tree, options.appName);
    const entryPath = options.entryPath ?? projectConfiguration.targets['build']['options']['outputPath'] + 'index.ts';
    const projectName = options.projectName ?? options.appName;
    const token = options.token ?? null;

    projectConfiguration.targets = {
      ...projectConfiguration.targets,
      deploy: {
        executor: '@k11r/nx-deno-deploy:deploy',
        options: {
          projectName,
          entryPath,
          ...(token ? {token} : null)
        },
      },
    };
    updateProjectConfiguration(tree, options.appName, projectConfiguration);
  } catch (e) {
    console.error(e);
  }
}
