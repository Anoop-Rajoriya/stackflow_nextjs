import { ANSWER, COMMENT, DB, PROFILE, QUESTION, VOTE } from "../names";
import {
  Permission,
  RelationMutate,
  RelationshipType,
  Role,
  tablesdb,
} from "../server.config";

/**
 * {
 * title,  r
 * body,   r
 * author, r
 * tags,   r
 * views,
 * votes,
 * answers,
 * comments
 * }
 */

export default async function createQuestion() {
  // 1️⃣ Create the QUESTION table
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

  // 2️⃣ Define columns for the QUESTION table
  await Promise.all([
    // title required
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "title",
      size: 200,
      required: true,
    }),

    // body required
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "body",
      size: 10000,
      required: true,
    }),

    // tags (array of strings) required
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "tags",
      size: 50, // max length per tag
      required: true,
      array: true,
    }),

    // author (relation to PROFILE table) required
    tablesdb.createRelationshipColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "author",
      relatedTableId: PROFILE, // must match your PROFILE table ID
      type: RelationshipType.ManyToOne,
      onDelete: RelationMutate.Cascade,
    }),

    // views
    tablesdb.createIntegerColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "views",
      required: false,
      xdefault: 0,
    }),

    // votes
    tablesdb.createIntegerColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "votes",
      required: false,
      xdefault: 0,
    }),

    // answers
    tablesdb.createIntegerColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "answers",
      required: false,
      xdefault: 0,
    }),
    // comments
    tablesdb.createIntegerColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "comments",
      required: false,
      xdefault: 0,
    }),
  ]);
}
