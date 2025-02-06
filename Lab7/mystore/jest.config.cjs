// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

// module.exports = {
//   // ... your existing config ...
  
//   collectCoverage: true,
//   coverageDirectory: "coverage",
//   coverageReporters: ["text", "lcov", "html"],
//   collectCoverageFrom: [
//     "src/**/*.{js,jsx,ts,tsx}",
//     "!src/**/*.d.ts",
//     "!src/index.tsx",
//     "!src/reportWebVitals.ts"
//   ],
  
//   // If you're using TypeScript, make sure you have these:
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
// };