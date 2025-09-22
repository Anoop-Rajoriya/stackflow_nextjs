import { Client, TablesDB, ID, Storage } from "node-appwrite";
import { appwrite } from "../env";

export const client = new Client()
  .setEndpoint(appwrite.endpoint)
  .setProject(appwrite.projectId)
  .setKey(appwrite.apiKey);

export const tablesdb = new TablesDB(client);
export const storage = new Storage(client);
export { ID };
