import { DB } from "./names";
import { tablesdb } from "./server.config";
import createUserProfileTable from "./tables/userProfile";

export default async function getOrCreateDB() {
  try {
    await tablesdb.get({
      databaseId: DB,
    });
  } catch (error) {
    try {
      await tablesdb.create({
        databaseId: DB,
        name: DB,
      });

      await Promise.all([createUserProfileTable()]);
    } catch (error) {
      console.log("File:- failed to create database: ", error);
    }
  }
}
