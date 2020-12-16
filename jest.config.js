const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");
require("dotenv/config");

module.exports = {
   testEnvironment: "node",
   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
