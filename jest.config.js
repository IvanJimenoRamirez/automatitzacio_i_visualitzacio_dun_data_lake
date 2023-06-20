module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMocks.js',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.[t|j]sx?$': ['babel-jest', { configFile: './tests/babel.config.js' }]
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  globals: {
    adminToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNjg2NjA1MTcyfQ.7wM_O8NpnWcK1ec90exosy3LDmjBx0pwwMOE8nPW11I',
    userWithZeroRightsToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHVzZXIuY29tIiwiZXhwIjoxNjg2NjA1MjA0fQ.xvVJgV1T3LaFb0tEwCl0I1bF8gs_sd7E3UPinEiyAU4',
    invalidSessionToken: 'invalidSessionToken',
    testLanguage: 'en-US'
  }
}
