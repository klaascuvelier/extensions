const { execSync } = require('child_process');
const { cwd } = require('process');
const { getProjects } = require('@nrwl/devkit');
const { FsTree } = require('@nrwl/tao/src/shared/tree');
const semanticRelease = require('semantic-release');
const { readFileSync, writeFileSync, existsSync } = require('fs');

(async function publish() {
    buildProjects();
    const version = await getVersion();
    const otp = getOtp();

    if (!version) {
        console.log('no release');
        return;
    }

    const packages = getPackages();

    for (const package of packages) {
        const [name, destination, source] = package;
        publishPackage(name, destination, source, version, otp);
    }

    execSync(`npm version ${version}`);
})();

function getOtp() {
    try {
        execSync(`which op`);
    } catch (e) {
        throw new Error(`Could not invoke OnePassword CLI.`);
    }

    try {
        return execSync(`eval $(op signin) && op item get Npmjs --otp`, {
            stdio: ['inherit', 'pipe', 'inherit'],
            encoding: 'utf-8',
        }).trim();
    } catch (e) {
        throw new Error(`Could not get one time password for npmjs: ` + e);
    }
}

function buildProjects() {
    execSync('nx run-many --target=build --all', {
        stdio: 'inherit',
    });
}

function getPackages() {
    const tree = new FsTree(cwd());
    const projects = getProjects(tree);

    return Array.from(projects.entries()).map((entry) => {
        const [name, config] = entry;
        return [name, config.targets.build.options.outputPath, config.root];
    });
}

async function getVersion() {
    const result = await semanticRelease();

    if (result && result.nextRelease) {
        const { version, notes } = result.nextRelease;

        const changelog =
            notes +
            (existsSync('CHANGELOG.md')
                ? readFileSync('CHANGELOG.md', 'utf8')
                : '');
        writeFileSync('CHANGELOG.md', changelog);

        return version;
    }

    return null;
}

function publishPackage(package, destination, source, version, otp) {
    console.log(`Publishing ${package} to version ${version}`);
    try {
        execSync(`npm version ${version}`, { cwd: destination });
        execSync(`npm version ${version}`, { cwd: source });
    } catch (e) {}

    execSync(`npm publish -access public -otp ${otp}`, { cwd: destination });
}
