import { ExecutorContext, readProjectConfiguration } from '@nx/devkit';
import { execSync, spawn } from 'child_process';
import { FsTree } from 'nx/src/generators/tree';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { properties: schemaProperties } = require('./schema.json');

export type RsyncDeployExecutorSchema = {
    noBuild: boolean;
    outputPath: string;
    deployIdentifier: string;
    previewUrl: string;
    rsyncTarget: string;
    rsyncUser: string;
    rsyncHost: string;
    preDeploy: string[];
    postDeploy: string[];
};

export default async function runExecutor(
    options: RsyncDeployExecutorSchema,
    context: ExecutorContext
) {
    const projectName = context.projectName;
    const {
        deployIdentifier,
        previewUrl,
        rsyncTarget,
        rsyncUser,
        rsyncHost,
        preDeploy,
        postDeploy,
    } = extractConfig(options);

    const tree = new FsTree(process.cwd(), false);
    const projectInfo = readProjectConfiguration(tree, projectName);
    const buildOutputPath = projectInfo.targets['build'].options.outputPath;
    const deployUrl =
        previewUrl.replace('$deployIdentifier', deployIdentifier) +
        (previewUrl.endsWith('/') ? '' : '/');

    if (options.noBuild) {
        console.info(`📦 Skipping build`);
    } else {
        if (!context.target) {
            throw new Error('Cannot build the application without a target');
        }

        if (!previewUrl) {
            throw new Error(
                'Cannot deploy the application without a previewUrl'
            );
        }

        const configuration = 'production';
        const overrides = {
            baseHref: deployUrl,
            deployUrl: deployUrl,
        };

        console.info(
            `📦 Building "${projectName}". Configuration: "${configuration}". ${deployIdentifier}`
        );

        console.warn(`Building not implemented`);

        // const build = await executeBrowserBuilder({} as unknown as BrowserBuilderSchema, context);
        //
        // const build = await context.scheduleTarget(
        //     {
        //         target: 'build',
        //         project: context.target.project || '',
        //         configuration,
        //     },
        //     overrides
        // );
        //
        // if (buildResult.success !== true) {
        //     console.error(`❌ Application build failed`);
        //     return {
        //         error: `❌ Application build failed`,
        //         success: false,
        //     };
        // }
        // context.logger.info(`✔ Build Completed`);
    }

    return deploy(
        context,
        deployIdentifier,
        buildOutputPath,
        rsyncTarget,
        rsyncUser,
        rsyncHost,
        preDeploy,
        postDeploy
    )
        .then(() => {
            console.info(`✔ Deploy Completed: ${deployUrl}`);
            return { success: true };
        })
        .catch((error) => {
            console.error(error);
            return { success: false };
        });
}

function extractConfig(config) {
    const deployIdentifier = normalizeText(
        withFallback(
            addDeployReplacements(
                withFallback(
                    config.deployIdentifier,
                    withFallback(getGitBranch(), '')
                )
            ),
            ''
        )
    ).toLowerCase();
    const rsyncTarget = stripEndSlash(
        withFallback(config.rsyncTarget, schemaProperties.rsyncTarget.default)
    );
    const rsyncUser = withFallback(
        config.rsyncUser,
        schemaProperties.rsyncUser.default
    );
    const rsyncHost = withFallback(
        config.rsyncHost,
        schemaProperties.rsyncHost.default
    );
    const previewUrl = withFallback(config.previewUrl, null);
    const preDeploy = (config.preDeploy ?? [])
        .map(addPrePostDeployReplacements)
        .join(`,`);

    const postDeploy = (config.postDeploy ?? [])
        .map(addPrePostDeployReplacements)
        .join(`,`);

    return {
        deployIdentifier,
        rsyncTarget,
        rsyncUser,
        rsyncHost,
        previewUrl,
        preDeploy,
        postDeploy,
    };

    function withFallback(text: string, fallback: string) {
        return text?.length > 0 ? text : fallback;
    }

    function getGitBranch() {
        try {
            return execSync(`git rev-parse --abbrev-ref HEAD`)
                .toString()
                .trim();
        } catch (error) {
            return null;
        }
    }

    function getCurrentSha() {
        try {
            return execSync(`git rev-parse --short HEAD`).toString().trim();
        } catch (error) {
            return null;
        }
    }

    function stripEndSlash(text) {
        return text.endsWith('/') ? text.slice(0, text.length - 1) : text;
    }

    function getCurrentDate() {
        const date = new Date();

        return `${date.getFullYear()}${padStart(
            date.getMonth(),
            2,
            '0'
        )}${padStart(date.getDate(), 2, '0')}`;
    }

    function padStart(text, targetLength, padString) {
        while (`${text}`.length < targetLength) {
            text = `${padString}${text}`;
        }

        return text;
    }

    function addPrePostDeployReplacements(text) {
        return text.replace('$deployIdentifier', deployIdentifier);
    }

    function addDeployReplacements(text) {
        return text
            .replace('$sha', getCurrentSha())
            .replace('$date', getCurrentDate());
    }
}

function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/, '-');
}

function deploy(
    context,
    deployIdentifier,
    source,
    target,
    user,
    host,
    preDeploy,
    postDeploy
) {
    const privateKey = process.env.SSH_PRIVATE_KEY || '-';
    const args = [
        './deploy.sh',
        privateKey,
        `../../../${source}/*`,
        `${target}/${deployIdentifier}`,
        `${user}@${host}`,
        preDeploy,
        postDeploy,
    ];

    const spawnOptions = {
        cwd: __dirname,
    };

    context.logger.info(`🚀 deploying application`);

    return new Promise((resolve, reject) => {
        const childProcess = spawn('sh', args, spawnOptions);
        let stdout = '';

        childProcess.stdout.on('data', (data) => {
            stdout += data;
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                context.logger.error(`🧨 deploying application failed`);

                console.log(stdout, code);
                reject(stdout);
            } else {
                console.log(stdout);

                resolve(stdout);
            }
        });
    });
}
