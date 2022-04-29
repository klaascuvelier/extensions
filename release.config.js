module.exports = {
    dryRun: false,
    branches: [
        'main',
        {
            name: '[\\s\\S]+',
            prerelease: true,
        },
    ],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
                releaseRules: [{ type: 'refactor', release: 'patch' }],
            },
        ],
    ],
};
