import path from "path";
import fs from "fs";
import { MongoMemoryServer } from "mongodb-memory-server";

const globalConfigPath = path.join(__dirname, "globalConfigMongo.json");

module.exports = async () => {
  const mongod: MongoMemoryServer =
    global.__MONGOD__ || (await MongoMemoryServer.create());

  if (!mongod.instanceInfo) {
    await mongod.start();
  }

  const mongoConfig = {
    mongoDBName: "jest",
    mongoUri: mongod.getUri(),
  };

  // Write global config to disk because all tests run in different contexts.
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod;
};
