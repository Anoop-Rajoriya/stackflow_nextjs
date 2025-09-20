import env from "@/config/env";
import { Account, Client, Storage, TablesDB, Users, ID } from "node-appwrite";

const client = new Client()
  .setEndpoint(env.appwrite.endpoint!)
  .setProject(env.appwrite.projectId!)
  .setKey(env.appwrite.apiKey!);

const account = new Account(client);
const tabledb = new TablesDB(client);
const storage = new Storage(client);
const users = new Users(client);

export { account, tabledb, storage, users, ID };
