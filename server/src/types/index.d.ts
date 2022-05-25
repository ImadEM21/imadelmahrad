import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
  var __MONGOD__: MongoMemoryServer;
  var __MONGO_URI__ : string;
  var __MONGO_DB_NAME__ : string;
}

export {};