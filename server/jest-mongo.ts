import NodeEnvironment from "jest-environment-node";
import JestEnvironmentConfig from "@jest/environment";
import path from "path";
import fs from "fs";

const globalConfigPath = path.join(__dirname, "globalConfigMongo.json");

class MongoEnvironment extends NodeEnvironment {
  constructor(
    config: JestEnvironmentConfig.JestEnvironmentConfig,
    context: JestEnvironmentConfig.EnvironmentContext
  ) {
    super(config, context);
  }

  async setup() {
    const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, "utf-8"));

    this.global.__MONGO_URI__ = globalConfig.mongoUri;
    this.global.__MONGO_DB_NAME__ = globalConfig.mongoDBName;

    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = MongoEnvironment;
