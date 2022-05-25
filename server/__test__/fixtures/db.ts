import mongoose from "mongoose";

let connection: mongoose.Connection;
let db: mongoose.Connection;

export default async function makeDb() {
  connection =
    connection ||
    mongoose.connect(global.__MONGO_URI__, {
      autoIndex: true,
    });
  db = db || connection.useDb(global.__MONGO_DB_NAME__);
  return db;
}

export async function closeDb() {
  await connection.close();
  await db.close();
}

export async function clearDb() {
  await db.collection("comments").deleteMany({});
  return true;
}

export { connection, db };
