/** @type {import('jest').Config} */
export default {
  preset: 'react-native',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-svg)/)',
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/test/svgMock.ts',
  },
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/theme/**/*.{ts,tsx}',
    'src/icons/**/*.{ts,tsx}',
    '!src/**/*.stories.tsx',
    '!src/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 70,
      functions: 70,
      statements: 70,
      branches: 50,
    },
  },
};
