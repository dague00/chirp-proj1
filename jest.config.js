const {defaults} = require('jest-config');
module.exports = {
    collectCoverageFrom: [
      "./src/**/*.{ts, tsx}",
      "!./src/shared/*",
      // "!**/node_modules/**",
    ],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    preset: "jest-dynalite",
    roots: ["<rootDir>"],
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  }