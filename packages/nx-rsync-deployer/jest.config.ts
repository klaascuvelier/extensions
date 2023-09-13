/* eslint-disable */
export default {
    displayName: 'nx-rsync-deployer',

    globals: {},
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]sx?$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
            },
        ],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/packages/nx-rsync-deployer',
    preset: '../../jest.preset.js',
};
