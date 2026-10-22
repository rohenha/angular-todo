import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getMongoDb(): Promise<Db> {
  if (db) return db;

  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/angular-todo";
  client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  return db;
}

export async function closeMongoConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}