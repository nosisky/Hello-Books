module.exports = {
  globals: {
    window: true,
  },
  verbose: true,
  collectCoverage: true,
  coverageDirectory: './clientCoverage',
  testPathIgnorePatterns: [
    './server/test',
    './node_modules/',
    '</rootDir>/client/__test__/__mocks__/mockLocalStorage.js',
  ],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
      '<rootDir>/client/__tests__/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/client/__tests__/__mocks__/styleMock.js'
  },
};
