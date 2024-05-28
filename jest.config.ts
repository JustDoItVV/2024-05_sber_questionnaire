module.exports = {
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
  transform: {
    '^.+\\.(t|j)sx?$': [
      "@swc/jest",
      {
        "jsc": {
          "target": "es2022",
          "parser": {
            "syntax": "typescript",
            "tsx": true,
            "dynamicImport": true,
            "privateMethod": true,
            "functionBind": true,
            "exportDefaultFrom": true,
            "exportNamespaceFrom": true,
            "importMeta": true
          },
          "transform": {
            "react": {
              "runtime": "automatic"
            }
          },
          "loose": true,
          "keepClassNames": true
        },
      },
    ],
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  resetMocks: true,
};
