module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/mocks/**",
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  coveragePathIgnorePatterns: [],
  testEnvironment: "jsdom",
  modulePaths: ["<rootDir>/src"],
  transform: {
    '^.+\\.(t|j)sx?$': [
      "@swc/jest",
      {
        jsc: {
          target: "es2022",
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
