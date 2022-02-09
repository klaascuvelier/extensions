import {execSync} from "child_process";

const deployCommand = 'deployctl';

export function isDeployCtlAvailable(): boolean {
  try {
    execSync(`which ${deployCommand}`).toString('utf-8');
    return true;
  } catch (e) {
    return false;
  }

}

export function deployProject(entryPoint: string, projectName: string, token: string | null = null, isProd = false) {
  if (!isDeployCtlAvailable()) {
    throw new Error(`Deno deployctl is not installed.`);
  }

  const options = [
    `--project=${projectName}`,
    isProd ? '--prod' : null,
    token?.length > 0 ? `--token=${token}` : null
  ].filter(part => part !== null).join(' ')

  const command = `${deployCommand} deploy ${options} ${entryPoint}`

  try {
    execSync(command);
    return {success: true};
  } catch (e) {
    return {success: false, error: e.toString()};
  }
}
