/* eslint-disable */
export default {
    displayName: 'nx-deno-deploy',

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
    coverageDirectory: '../../coverage/packages/nx-deno-deploy',
    preset: '../../jest.preset.js',
};
