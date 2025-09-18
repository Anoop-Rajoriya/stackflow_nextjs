import { tabledb } from "../server.config";
import { DB_NAME, ANSWER } from "../names";
import { Permission, Role } from "node-appwrite";

export default async function createAnswerTable() {
  // Create Table
  await tabledb.createTable({
    databaseId: DB_NAME,
    tableId: ANSWER,
    name: ANSWER,
    permissions: [
      Permission.read(Role.any()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ],
  });
  // Create Columnes
  await Promise.all([
    tabledb.createStringColumn({
      databaseId: DB_NAME,
      tableId: ANSWER,
      key: "content",
      size: 10000,
      required: true,
    }),
    tabledb.createStringColumn({
      databaseId: DB_NAME,
      tableId: ANSWER,
      key: "questionId",
      size: 50,
      required: true,
    }),
    tabledb.createStringColumn({
      databaseId: DB_NAME,
      tableId: ANSWER,
      key: "authorId",
      size: 50,
      required: true,
    }),
  ]);
  // Create Indexes
}
