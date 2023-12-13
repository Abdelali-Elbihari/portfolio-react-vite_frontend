module.exports = {
  // Tells Jest to look for test files in the "src" directory.
  roots: ['<rootDir>'],

  // Configures Jest to use an environment that supports browser-like globals.
  testEnvironment: 'jest-environment-jsdom',

  setupFilesAfterEnv: ['./jest.setup.js'],

  // Transforms files with Babel before running tests.
  transformIgnorePatterns: [],
  transform: {
    '^.+\\.(jsx|js)?$': ['babel-jest', { configFile: './babel.config.cjs' }]
  },
  testMatch: ['**/*test.js?(x)'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/test/__mocks__/styleMock.js'
  }
};
