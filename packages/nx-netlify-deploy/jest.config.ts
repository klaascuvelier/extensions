/* eslint-disable */
export default {
    displayName: 'nx-netlify-deploy',

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
    coverageDirectory: '../../coverage/packages/nx-netlify-deploy',
    preset: '../../jest.preset.js',
};
