import { Account, Client, ID, TablesDB } from "appwrite";
import { appwrite } from "../env";

export const client = new Client()
  .setEndpoint(appwrite.endpoint)
  .setProject(appwrite.projectId);

export const account = new Account(client);
export const tablesdb = new TablesDB(client);

export { ID };
