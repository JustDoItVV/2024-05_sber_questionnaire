module.exports = {
  preset: 'ts-jest/presets/default-esm',
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/mocks/**",
  ],
  setupFiles: ['./jest.setup.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  coveragePathIgnorePatterns: [],
  testEnvironment: "jsdom",
  modulePaths: ["<rootDir>/src"],
  // transform: {
  //   '^.+\\.(t|j)sx?$': [
  //     "@swc/jest",
  //     {
  //       "jsc": {
  //         "target": "es2020",
  //         "parser": {
  //           "syntax": "typescript",
  //           "tsx": true,
  //           // "dynamicImport": true,
  //           // "privateMethod": true,
  //           // "functionBind": true,
  //           // "exportDefaultFrom": true,
  //           // "exportNamespaceFrom": true,
  //           // "importMeta": true,
  //         },
  //         "transform": {
  //           "react": {
  //             "runtime": "automatic"
  //           }
  //         },
  //       },
  //     },
  //   ],
  // },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/app/test-mocks/style-mocks.ts",
  },
  // transformIgnorePatterns: [
  //   "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
  //   "^.+\\.module\\.(css|sass|scss)$",
  // ],
  // resetMocks: true,
};
