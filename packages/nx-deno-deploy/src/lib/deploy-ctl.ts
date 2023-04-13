import { execSync } from 'child_process';

const deployCommand = 'deployctl';
const denoCommand = 'deno';

type SemVer = `${number}.${number}.${number}`;

function isVersionGreaterOrEqualSemVer(
    version1: SemVer,
    version2: SemVer
): boolean {
    const v1 = version1.split('.');
    const v2 = version2.split('.');

    for (let i = 0; i < v1.length; i++) {
        const v1Num = parseInt(v1[i], 10);
        const v2Num = parseInt(v2[i], 10);

        if (v1Num > v2Num) {
            return true;
        } else if (v1Num < v2Num) {
            return false;
        }
    }

    return true;
}

export function requireDeployCtlVersion(
    minimumVersion: SemVer = '0.0.0'
): void | never {
    try {
        execSync(`which ${deployCommand}`).toString('utf-8');
        const version = execSync(`${deployCommand} --version`)
            .toString()
            .replace('deployctl ', '');

        if (!isVersionGreaterOrEqualSemVer(version as SemVer, minimumVersion)) {
            throw new Error(
                `Deno deployctl ${minimumVersion} is not installed.`
            );
        }

        console.log(version);
    } catch (e) {
        const message =
            minimumVersion !== '0.0.0'
                ? `Deno deployctl ${minimumVersion} is not installed.`
                : `Deno deployctl is not installed.`;

        throw new Error(message);
    }
}

export function requireDeno(): void | never {
    try {
        execSync(`which ${denoCommand}`).toString('utf-8');
    } catch (e) {
        throw new Error(`Deno is not installed`);
    }
}

export function deployProject(
    mainFile: string,
    sourceRoot: string,
    denoProject: string,
    isProd = false,
    token = ''
) {
    requireDeployCtlVersion('1.5.0');

    const options = [
        `--project=${denoProject}`,
        `--import-map=deno.json`,
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
    requireDeno();

    const command = `${denoCommand} test`;

    try {
        console.log(command);
        execSync(command, { cwd: sourceRoot });
        return { success: true };
    } catch (e) {
        return { success: false, error: e.toString() };
    }
}

export function lintProject(sourceRoot: string) {
    requireDeno();

    const command = `${denoCommand} lint`;

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
    requireDeno();

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
