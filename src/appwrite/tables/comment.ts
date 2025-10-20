import { DB, COMMENT, PROFILE } from "../names";
import {
  Permission,
  RelationMutate,
  RelationshipType,
  Role,
  tablesdb,
} from "../server.config";

/**
 * {
 * targetType, r
 * targetId,   r
 * body,       r
 * author      r
 * }
 */

export default async function createComment() {
  // 1️⃣ Create the COMMENT table
  await tablesdb.createTable({
    databaseId: DB,
    tableId: COMMENT,
    name: COMMENT,
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
      tableId: COMMENT,
      key: "author",
      type: RelationshipType.ManyToOne,
      relatedTableId: PROFILE, // must match your PROFILE table ID
      onDelete: RelationMutate.Cascade,
    }),

    // targetType — "question" or "answer"
    tablesdb.createEnumColumn({
      databaseId: DB,
      tableId: COMMENT,
      key: "targetType",
      elements: ["question", "answer"],
      required: true,
    }),

    // targetId — to know which question or answer this comment belongs to
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: COMMENT,
      key: "targetId",
      size: 50,
      required: true,
    }),

    // body — the comment text
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: COMMENT,
      key: "body",
      size: 10000,
      required: true,
    }),
  ]);
}
