module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/__mocks__/styleMocks.js',
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
    },
    transform: {
      '^.+\\.[t|j]sx?$': ['babel-jest', {configFile: './tests/babel.config.js'}],
    },
    globals: {
        fetch: require('node-fetch'),
      }
}