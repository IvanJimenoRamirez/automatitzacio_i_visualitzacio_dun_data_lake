module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/__mocks__/styleMocks.js',
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
    },
    transform: {
      '^.+\\.[t|j]sx?$': ['babel-jest', {configFile: './tests/babel.config.js'}],
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    globals: {
        adminToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNjg2NDE1MzY5fQ.c4z1Gt6_eErd70OqJpSccMaxjt6yBO7DfoKX-K05Uh0",
        userWithZeroRightsToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHVzZXIuY29tIiwiZXhwIjoxNjg2NDE3Mjc2fQ.2StsvOoVGitSPy46V51jxLsWuM8e0lLh4ZFtc0sdjFQ",
        invalidSessionToken: "invalidSessionToken",
        testLanguage: "en-US"
      }
}