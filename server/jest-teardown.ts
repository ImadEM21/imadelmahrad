import { GlobalConfigTsJest, ProjectConfigTsJest } from "ts-jest";

module.exports = async function (
  globalConfig: GlobalConfigTsJest,
  projectConfig: ProjectConfigTsJest
) {
  if (!globalConfig.watch && !globalConfig.watchAll) {
    await global.__MONGOD__.stop();
  }
};
