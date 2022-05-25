import mongoose from "mongoose";

import makeProjectsDb from "./projects";

const url = process.env.DM_PROJECTS_DB_URL;
const dbName = process.env.DM_PROJECTS_DB_NAME;
const client = mongoose.connect(`${url}/${dbName}`, { autoIndex: true });

export async function makeDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${url}/${dbName}`, { autoIndex: true });
  }
  return client;
}

const projectsDb = makeProjectsDb({ makeDb });
export default projectsDb;
