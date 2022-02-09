import {ExecutorContext} from "@nrwl/tao/src/shared/workspace";
import {DeployExecutorSchema} from "./schema";
import {deployProject} from "../../lib/deploy-ctl";

export default async function deployExecutor(options: DeployExecutorSchema, context: ExecutorContext) {
  const {projectName, isProd, token, entryPath} = options;


  return deployProject(entryPath, projectName, token, isProd);
}
