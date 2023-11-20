const { execSync } = require('child_process');
const { cwd } = require('process');
const { getProjects } = require('@nrwl/devkit');
const semanticRelease = require('semantic-release');
const { readFileSync, writeFileSync, existsSync } = require('fs');
const { git } = require('commitizen/dist/cli/strategies');
const { FsTree } = require('nx/src/generators/tree');
const { readFile, writeFile } = require('fs/promises');
const { join } = require('node:path');
const inquirer = require('inquirer');

(async function publish() {
    buildProjects();

    const { version, notes, gitTag } = await getVersion();
    if (!version) {
        console.log('no release');
        return;
    }
    const confirm = await inquirer.prompt([
        { type: 'confirm', name: 'continue', message: `Release ${version}?` },
    ]);

    if (!confirm.continue) {
        console.log('release cancelled');
        process.exit();
    }

    const otp = getOtp();
    console.log('✅ retrieved OTP');
    await setNpmVersion(join(process.cwd(), 'package.json'), version);
    console.log('✅ Set npm version to', version);
    updateChangelog(notes);
    console.log('✅ Updated changelog');
    pushGitTag(gitTag);
    console.log('✅ Tagged successfully');

    const packages = getPackages();

    for (const package of packages) {
        const [name, destination, source] = package;
        await publishPackage(name, destination, source, version, otp);
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
        `git add CHANGELOG.md package.json package-lock.json && HUSKY=0 git commit -m "release 🚀: ${tag}" --no-verify && git tag v${tag}  && git push origin --all && git push origin --tags`,
        { stdio: 'inherit' }
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

async function publishPackage(package, destination, source, version, otp) {
    console.log(`Publishing ${package} to version ${version}`);

    await setNpmVersion(join(destination, 'package.json'), version);
    await setNpmVersion(join(source, 'package.json'), version);

    const packageInfoRaw = await readFile(
        join(destination, 'package.json'),
        'utf8'
    );
    const packageInfo = JSON.parse(packageInfoRaw);

    execSync(`npm publish -access public -otp ${otp}`, { cwd: destination });

    if (packageInfo.deprecationMessage) {
        execSync(
            `npm deprecate ${packageInfo.name} "${packageInfo.deprecationMessage}" -otp ${otp}`,
            { cwd: destination }
        );
    }
}

async function setNpmVersion(packageJsonPath, version) {
    try {
        const content = await readFile(packageJsonPath, 'utf8');
        const data = JSON.parse(content);
        data.version = version;
        await writeFile(packageJsonPath, JSON.stringify(data, null, 4));
    } catch (error) {
        console.error(
            'Could not update NPM version for ',
            packageJsonPath,
            error
        );
        process.exit(1);
    }
}
