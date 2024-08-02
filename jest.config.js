/**
 * DOCS:
 * - https://github.com/necolas/react-native-web/discussions/2341
 * - https://legacy.reactjs.org/docs/test-renderer.html
 * - https://jestjs.io/docs/tutorial-react
 */

const { defaults } = require("jest-config");
const baseConfig = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "js", "jsx"],
  verbose: true,
  // preset: "jest-expo",
  transform: {
    "\\.[jt]sx?$": ["babel-jest", { configFile: "./babel-jest.config.js" }],
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)",
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
  },
  setupFiles: [
    "<rootDir>/jest-setup.js",
    "<rootDir>/__mocks__/global/matchMediaMock.mock.js",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testPathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/redux/index.js",
    "<rootDir>/redux/reducers",
    "<rootDir>/redux/middleware",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/redux/index.js",
    "<rootDir>/redux/reducers",
    "<rootDir>/redux/middleware",
  ],
};

module.exports = {
  projects: [
    {
      displayName: "Web",
      preset: "jest-expo/web",
      // This is brittle, we did this so snapshot naming/modifying is consistent
      snapshotResolver: "jest-expo/src/snapshot/resolver.web.js",
      ...baseConfig,
    },
  ],
};
