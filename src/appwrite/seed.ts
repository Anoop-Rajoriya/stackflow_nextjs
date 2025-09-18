import { DB_NAME } from "./names";
import { tabledb } from "./server.config";
import createQuestionTable from "./tables/question";
import createAnswerTable from "./tables/answer";
import createCommentTable from "./tables/comment";
import createVoteTable from "./tables/vote";

export default async function seedOrGetDB() {
  try {
    await tabledb.get({ databaseId: DB_NAME });
  } catch (error) {
    try {
      console.log("Creating and seeding TableDB...");
      await tabledb.create({ databaseId: DB_NAME, name: DB_NAME });
      await Promise.all([
        createQuestionTable(),
        createAnswerTable(),
        createCommentTable(),
        createVoteTable(),
      ]);
      console.log("TableDB created!");
    } catch (error) {
      console.error("File:- seed error: ", error);
    }
  }
}
