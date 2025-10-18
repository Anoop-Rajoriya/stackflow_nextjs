// {
//   "id": "q101",
//   "title": "How to debounce an input in React?",
//   "body": "I'm trying to debounce a search input to avoid API spam.\n\nHere's my code:\n\n```jsx\nconst handleChange = (e) => {\n  setQuery(e.target.value);\n};\n```\n\nHow can I add debounce to this?",
//   "tags": ["react", "javascript", "frontend"],
//   "author": {"profileTable"},
//   "answers": [{answerTable}],
//   "comments": [{"commentTable"}],
//   "votes": [{"voteTable"}],
//   "views": 230,
//   "isResolved": false
// }

import { ANSWER, COMMENT, DB, PROFILE, QUESTION, VOTE } from "../names";
import {
  Permission,
  RelationMutate,
  RelationshipType,
  Role,
  tablesdb,
} from "../server.config";

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

    // answers (relation to ANSWER table — one-to-many)
    tablesdb.createRelationshipColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "answers",
      relatedTableId: ANSWER,
      type: RelationshipType.OneToMany,
      onDelete: RelationMutate.Cascade,
    }),

    // comments (relation to COMMENT table — one-to-many)
    tablesdb.createRelationshipColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "comments",
      relatedTableId: COMMENT,
      type: RelationshipType.OneToMany,
      onDelete: RelationMutate.Cascade,
    }),

    // votes (relation to VOTE table — one-to-many)
    tablesdb.createRelationshipColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "votes",
      relatedTableId: VOTE,
      type: RelationshipType.OneToMany,
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

    // isResolved
    tablesdb.createBooleanColumn({
      databaseId: DB,
      tableId: QUESTION,
      key: "isResolved",
      required: false,
      xdefault: false,
    }),
  ]);
}
