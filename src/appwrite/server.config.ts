import {
  Client,
  Account,
  TablesDB,
  ID,
  Storage,
  Permission,
  Role,
  Query,
  RelationshipType,
  RelationMutate,
  Models,
} from "node-appwrite";
import { appwrite } from "../lib/env";

export const client = new Client()
  .setEndpoint(appwrite.endpoint)
  .setProject(appwrite.projectId)
  .setKey(appwrite.apiKey);

export const account = new Account(client);
export const tablesdb = new TablesDB(client);
export const storage = new Storage(client);
export { ID, Permission, Role, Query, RelationshipType, RelationMutate };

export async function verifyAppwriteJwt(
  token: string
): Promise<Models.User<Models.Preferences>> {
  // Instantiate a NEW Client per request for thread safety
  const client = new Client()
    .setEndpoint(appwrite.endpoint)
    .setProject(appwrite.projectId)
    .setJWT(token); // Set the user's session token

  const account = new Account(client);

  const user = await account.get();

  return user;
}
