import puppeteer_preset from 'jest-puppeteer/jest-preset.js';
import ts_preset from 'ts-jest/jest-preset.js';

export default {
  ...puppeteer_preset,
  ...ts_preset,
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/mocks/**",
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  coveragePathIgnorePatterns: [],
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/app/test-mocks/style-mocks.ts",
  },
};
