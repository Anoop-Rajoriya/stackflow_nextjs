import { tabledb } from "../server.config";
import { DB_NAME, COMMENT } from "../names";
import { Permission, Role } from "node-appwrite";

export default async function createCommentTable() {
  // Create Table
  await tabledb.createTable({
    databaseId: DB_NAME,
    tableId: COMMENT,
    name: COMMENT,
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
      tableId: COMMENT,
      key: "content",
      size: 10000,
      required: true,
    }),
    tabledb.createEnumColumn({
      databaseId: DB_NAME,
      tableId: COMMENT,
      key: "type",
      elements: ["answer", "question"],
      required: true,
    }),
    tabledb.createStringColumn({
      databaseId: DB_NAME,
      tableId: COMMENT,
      key: "targetId",
      size: 50,
      required: true,
    }),
    tabledb.createStringColumn({
      databaseId: DB_NAME,
      tableId: COMMENT,
      key: "authorId",
      size: 50,
      required: true,
    }),
  ]);
}
