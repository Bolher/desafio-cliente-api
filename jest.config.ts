module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: { '^.+\\.tsx?$': ['ts-jest', { useESM: true }] },
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  extensionsToTreatAsEsm: ['.ts'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts', '!src/**/routes.ts'],
  coverageThreshold: { global: { lines: 70, statements: 70 } }
};
