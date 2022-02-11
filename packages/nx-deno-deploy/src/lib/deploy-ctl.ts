import { execSync } from 'child_process';

const deployCommand = 'deployctl';
const denoCommand = 'deno';

export function isDeployCtlAvailable(): boolean {
    try {
        execSync(`which ${deployCommand}`).toString('utf-8');
        return true;
    } catch (e) {
        return false;
    }
}

export function isDenoAvailable(): boolean {
    try {
        execSync(`which ${denoCommand}`).toString('utf-8');
        return true;
    } catch (e) {
        return false;
    }
}

export function deployProject(
    mainFile: string,
    sourceRoot: string,
    denoProject: string,
    isProd = false,
    token = ''
) {
    if (!isDeployCtlAvailable()) {
        throw new Error(`Deno deployctl is not installed.`);
    }

    const options = [
        `--project=${denoProject}`,
        isProd ? '--prod' : null,
        token.length > 0 ? `--token=${token}` : '',
    ]
        .filter((part) => part !== null)
        .join(' ');

    const command = `${deployCommand} deploy ${options} ${mainFile}`;

    try {
        console.log(command);
        execSync(command, { cwd: sourceRoot });
        return { success: true };
    } catch (e) {
        return { success: false, error: e.toString() };
    }
}

export function testProject(sourceRoot: string) {
    if (!isDenoAvailable()) {
        throw new Error(`Deno is not installed.`);
    }

    const command = `${denoCommand} test`;

    try {
        console.log(command);
        execSync(command, { cwd: sourceRoot });
        return { success: true };
    } catch (e) {
        return { success: false, error: e.toString() };
    }
}

export function runProject(
    mainFile: string,
    sourceRoot: string,
    flags: string[] = []
) {
    if (!isDenoAvailable()) {
        throw new Error(`Deno is not installed.`);
    }

    const options = flags.join(' ');
    const command = `${denoCommand} run ${options} ${mainFile}`;

    try {
        console.log(command);
        execSync(command, { cwd: sourceRoot, stdio: 'inherit' });
        return { success: true };
    } catch (e) {
        return { success: false, error: e.toString() };
    }
}
