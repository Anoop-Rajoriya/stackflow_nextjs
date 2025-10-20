import { DB, ANSWER, VOTE, COMMENT, PROFILE } from "../names";
import {
  Permission,
  RelationMutate,
  RelationshipType,
  Role,
  tablesdb,
} from "../server.config";

/**
 * {
 * body,    r
 * author,  r
 * votes,
 * isAccepted,
 * }
 */

export default async function createAnswer() {
  // 1️⃣ Create the ANSWER table
  await tablesdb.createTable({
    databaseId: DB,
    tableId: ANSWER,
    name: ANSWER,
    permissions: [
      Permission.read(Role.any()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ],
  });

  // 2️⃣ Define columns for the ANSWER table
  await Promise.all([
    // authorId — who wrote the answer
    tablesdb.createRelationshipColumn({
      databaseId: DB,
      tableId: ANSWER,
      key: "author",
      relatedTableId: PROFILE,
      type: RelationshipType.ManyToOne,
      onDelete: RelationMutate.Cascade,
    }),

    // body — the main answer content (Markdown / text)
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: ANSWER,
      key: "body",
      size: 10000,
      required: true,
    }),

    // isAccepted — whether this is the accepted answer
    tablesdb.createBooleanColumn({
      databaseId: DB,
      tableId: ANSWER,
      key: "isAccepted",
      required: false,
      xdefault: false,
    }),
    // votes
    tablesdb.createIntegerColumn({
      databaseId: DB,
      tableId: ANSWER,
      key: "votes",
      required: false,
      xdefault: 0,
    }),
  ]);
}
