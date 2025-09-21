import { Account, Client, ID, Storage, TablesDB } from "appwrite";
import { appwrite } from "../env";

export const client = new Client()
  .setEndpoint(appwrite.endpoint)
  .setProject(appwrite.projectId);

export const account = new Account(client);
export const tablesdb = new TablesDB(client);
export const storage = new Storage(client);

export { ID };
