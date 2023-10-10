const { execSync } = require('child_process');
const { cwd } = require('process');
const { getProjects } = require('@nrwl/devkit');
const semanticRelease = require('semantic-release');
const { readFileSync, writeFileSync, existsSync } = require('fs');
const { git } = require('commitizen/dist/cli/strategies');
const { FsTree } = require('nx/src/generators/tree');

(async function publish() {
    buildProjects();

    // const { version, notes, gitTag } = await getVersion();
    // if (!version) {
    //     console.log('no release');
    //     return;
    // }
    const version = '2.7.0-beta.0';
    // const otp = getOtp();
    // console.log('✅ OTP');
    console.log('start');
    execSync(`npm version ${version}`, { stdio: 'inherit' });
    console.log('✅ NPMV');
    // updateChangelog(notes);
    //  console.log('✅ CHANGELOG');
    //pushGitTag(gitTag);
    //  console.log('✅ GITTAG');

    const packages = getPackages();

    for (const package of packages) {
        const [name, destination, source] = package;
        publishPackage(name, destination, source, version, otp);
    }

    // remove package.json updates
    execSync(`git checkout -- packages`);
})();

function updateChangelog(notes) {
    const changelog =
        notes +
        (existsSync('CHANGELOG.md')
            ? readFileSync('CHANGELOG.md', 'utf8')
            : '');
    writeFileSync('CHANGELOG.md', changelog);
}

function pushGitTag(tag) {
    execSync(
        `git add CHANGELOG.md package.json package-lock.json && git commit -m "release 🚀: ${tag}" && git push origin --all`
    );
}

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
    execSync('npx nx run-many --target=build --all', {
        stdio: 'inherit',
    });
}

function getPackages() {
    const tree = new FsTree(cwd(), false);
    const projects = getProjects(tree);

    return Array.from(projects.entries()).map((entry) => {
        const [name, config] = entry;
        return [name, config.targets.build.options.outputPath, config.root];
    });
}

async function getVersion() {
    const result = await semanticRelease();

    if (result && result.nextRelease) {
        return result.nextRelease;
    }

    return {};
}

function publishPackage(package, destination, source, version, otp) {
    console.log(`Publishing ${package} to version ${version}`);
    try {
        execSync(`npm version ${version}`, { cwd: destination });
        execSync(`npm version ${version}`, { cwd: source });
    } catch (e) {}

    execSync(`npm publish -access public -otp ${otp}`, { cwd: destination });
}
