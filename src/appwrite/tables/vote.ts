import { tabledb } from "../server.config";
import { DB_NAME, VOTE } from "../names";
import { Permission, Role } from "node-appwrite";

export default async function createVoteTable() {
  // Create Table
  await tabledb.createTable({
    databaseId: DB_NAME,
    tableId: VOTE,
    name: VOTE,
    permissions: [
      Permission.read(Role.any()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ],
  });
  // Create Columnes
  await Promise.all([
    tabledb.createEnumColumn({
      databaseId: DB_NAME,
      tableId: VOTE,
      key: "type",
      elements: ["question", "answer"],
      required: true,
    }),
    tabledb.createEnumColumn({
      databaseId: DB_NAME,
      tableId: VOTE,
      key: "status",
      elements: ["upvoted", "downvoted"],
      required: true,
    }),
    tabledb.createStringColumn({
      databaseId: DB_NAME,
      tableId: VOTE,
      key: "targetId",
      size: 50,
      required: true,
    }),
    tabledb.createStringColumn({
      databaseId: DB_NAME,
      tableId: VOTE,
      key: "votedById",
      size: 50,
      required: true,
    }),
  ]);
}
