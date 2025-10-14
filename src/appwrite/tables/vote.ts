// {
//   "id": "vote_01",
//   "author": {ProfilTable},
//   "targetType": "question",  // or "answer"
//   "targetid": "questionId",
//   "value": 1,                // 1 = upvote, -1 = downvote
// }

import { DB, PROFILE, VOTE } from "../names";
import {
  Permission,
  RelationMutate,
  RelationshipType,
  Role,
  tablesdb,
} from "../server.config";

export default async function createVote() {
  // 1️⃣ Create the VOTE table
  await tablesdb.createTable({
    databaseId: DB,
    tableId: VOTE,
    name: VOTE,
    permissions: [
      Permission.read(Role.any()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ],
  });

  // 2️⃣ Define columns for VOTE table
  await Promise.all([
    // author — relation to PROFILE table
    tablesdb.createRelationshipColumn({
      databaseId: DB,
      tableId: VOTE,
      key: "author",
      type: RelationshipType.OneToOne,
      relatedTableId: PROFILE, // must match PROFILE table ID
      onDelete: RelationMutate.Cascade,
    }),

    // targetType — question or answer
    tablesdb.createEnumColumn({
      databaseId: DB,
      tableId: VOTE,
      key: "targetType",
      elements: ["question", "answer"],
      required: true,
    }),

    // targetId — the ID of the question or answer being voted on
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: VOTE,
      key: "targetId",
      size: 50,
      required: true,
    }),

    // value — 1 for upvote, -1 for downvote
    tablesdb.createIntegerColumn({
      databaseId: DB,
      tableId: VOTE,
      key: "value",
      required: true,
    }),
  ]);
}
