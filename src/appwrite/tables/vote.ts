import { DB, PROFILE, VOTE } from "../names";
import {
  Permission,
  RelationMutate,
  RelationshipType,
  Role,
  tablesdb,
} from "../server.config";

/**
 * {
 * voteType, r
 * targetId,   r
 * author      r
 * }
 */

export default async function createVote() {
  // 1️⃣ Create the COMMENT table
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

  // 2️⃣ Define columns for COMMENT table
  await Promise.all([
    // author (relation to PROFILE table)
    tablesdb.createRelationshipColumn({
      databaseId: DB,
      tableId: VOTE,
      key: "author",
      type: RelationshipType.ManyToOne,
      relatedTableId: PROFILE, // must match your PROFILE table ID
      onDelete: RelationMutate.Cascade,
    }),

    // voteType — "downVote" or "upVote"
    tablesdb.createEnumColumn({
      databaseId: DB,
      tableId: VOTE,
      key: "voteType",
      elements: ["downVote", "upVote"],
      required: true,
    }),

    // targetId — to know which question or answer this comment belongs to
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: VOTE,
      key: "targetId",
      size: 50,
      required: true,
    }),
  ]);
}
