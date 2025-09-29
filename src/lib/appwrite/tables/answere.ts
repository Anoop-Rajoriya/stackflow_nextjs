import { Permission, Role } from "node-appwrite";
import { ANSWERE, DB } from "../names";
import { tablesdb } from "../server.config";

export default async function createAnswereTable() {
  // Create Table
  await tablesdb.createTable({
    databaseId: DB,
    tableId: ANSWERE,
    name: ANSWERE,
    permissions: [
      Permission.read(Role.any()),
      Permission.write(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ],
  });

  // Create Coloumns
  /**
   * title
   * body
   * questionId
   * userId
   */

  await Promise.all([
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: ANSWERE,
      key: "title",
      size: 100,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: ANSWERE,
      key: "body",
      size: 10000,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: ANSWERE,
      key: "questionId",
      size: 50,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: ANSWERE,
      key: "userId",
      size: 50,
      required: true,
    }),
  ]);
}
