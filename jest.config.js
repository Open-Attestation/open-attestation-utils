/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.dom.setup.ts"],
  testMatch: ["**/src/__tests__/**/*.[jt]s?(x)", "**/src/**/?(*.)test.[jt]s?(x)"],
};
