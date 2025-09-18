import env from "@/config/env";
import { Client, Account, TablesDB, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(env.appwrite.endpoint!)
  .setEndpoint(env.appwrite.projectId!);

const account = new Account(client);
const tabledb = new TablesDB(client);
const storage = new Storage(client);

export { account, tabledb, storage };
