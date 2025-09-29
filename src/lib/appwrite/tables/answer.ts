import { Permission, Role } from "node-appwrite";
import { ANSWER, DB } from "../names";
import { tablesdb } from "../server.config";

export default async function createAnswerTable() {
  // Create Table
  await tablesdb.createTable({
    databaseId: DB,
    tableId: ANSWER,
    name: ANSWER,
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
   * status
   * questionId
   * userId
   */

  await Promise.all([
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: ANSWER,
      key: "title",
      size: 100,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: ANSWER,
      key: "body",
      size: 10000,
      required: true,
    }),
    tablesdb.createEnumColumn({
      databaseId: DB,
      tableId: ANSWER,
      key: "status",
      elements: ["active", "accepted"],
      xdefault: "active",
      required: false,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: ANSWER,
      key: "questionId",
      size: 50,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: ANSWER,
      key: "userId",
      size: 50,
      required: true,
    }),
  ]);
}
