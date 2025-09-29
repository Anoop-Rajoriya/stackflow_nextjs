import { DB } from "./names";
import { tablesdb } from "./server.config";
import createAnswereTable from "./tables/answere";
import createQuestionTable from "./tables/question";
import createUserProfileTable from "./tables/userProfile";

export default async function getOrCreateDB() {
  try {
    await tablesdb.get({
      databaseId: DB,
    });
  } catch (error) {
    try {
      console.log("File:- setupDB, creating tableDB & tables!");
      await tablesdb.create({
        databaseId: DB,
        name: DB,
      });

      await Promise.all([
        createUserProfileTable(),
        createQuestionTable(),
        createAnswereTable(),
      ]);

      console.log("File:- setupDB, tableDB & tables created!");
    } catch (error) {
      console.log("File:- failed to create database: ", error);
    }
  }
}
