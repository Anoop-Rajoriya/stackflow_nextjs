import { Permission, Role } from "node-appwrite";
import { DB, QUESTION } from "../names";
import { tablesdb, ID } from "../server.config";

export default async function createQuestionTable() {
  // Create Table
  await tablesdb.createTable({
    databaseId: DB,
    tableId: QUESTION,
    name: QUESTION,
    permissions: [
      Permission.read(Role.any()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ],
  });

  // Create Table Columns
  /**
   * title
   * body
   * tags
   * status
   * userId
   */

  await Promise.all([
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "title",
      size: 100,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "body",
      size: 10000,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "tags",
      size: 50,
      required: true,
      array: true,
    }),
    tablesdb.createEnumColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "status",
      elements: ["active", "inactive"],
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "userId",
      size: 50,
      required: true,
    }),
  ]);
}
