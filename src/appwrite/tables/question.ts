import { tabledb } from "../server.config";
import { DB_NAME, QUESTION } from "../names";
import { IndexType } from "node-appwrite";
import { Permission, Role } from "node-appwrite";

export default async function createQuestionTable() {
  // Create Table
  await tabledb.createTable({
    databaseId: DB_NAME,
    tableId: QUESTION,
    name: QUESTION,
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
      tableId: QUESTION,
      key: "title",
      size: 100,
      required: true,
    }),
    tabledb.createStringColumn({
      databaseId: DB_NAME,
      tableId: QUESTION,
      key: "content",
      size: 1000,
      required: true,
    }),
    tabledb.createStringColumn({
      databaseId: DB_NAME,
      tableId: QUESTION,
      key: "authorId",
      size: 50,
      required: true,
    }),
    tabledb.createStringColumn({
      databaseId: DB_NAME,
      tableId: QUESTION,
      key: "tags",
      size: 50,
      required: true,
      xdefault: undefined,
      array: true,
    }),
    tabledb.createStringColumn({
      databaseId: DB_NAME,
      tableId: QUESTION,
      key: "attachmentId",
      size: 50,
      required: false,
    }),
  ]);

  // Create Indexes
  await Promise.all([
    tabledb.createIndex({
      databaseId: DB_NAME,
      tableId: QUESTION,
      key: "title",
      type: IndexType.Fulltext,
      columns: ["title"],
      orders: ["asc"],
    }),
    tabledb.createIndex({
      databaseId: DB_NAME,
      tableId: QUESTION,
      key: "tags",
      type: IndexType.Fulltext,
      columns: ["tags"],
      orders: ["asc"],
    }),
  ]);
}
