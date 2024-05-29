import ts_preset from 'ts-jest/jest-preset.js';

export default {
  ...ts_preset,
  // preset: 'ts-jest/presets/default-esm',
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
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/app/test-mocks/style-mocks.ts",
  },
};
