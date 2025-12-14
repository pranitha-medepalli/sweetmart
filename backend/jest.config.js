export default {
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  collectCoverageFrom: [
    'controllers/**/*.js',
    'models/**/*.js',
    'middleware/**/*.js',
    'utils/**/*.js',
    'routes/**/*.js',
    '!**/node_modules/**',
    '!**/__tests__/**',
  ],
  coverageDirectory: 'coverage',
  verbose: true,
};

