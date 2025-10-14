// {
//   "id": "ans_01",
//   "author": {"profile"},
//   "body": "You can use `lodash.debounce`:\n\n```jsx\nimport debounce from 'lodash.debounce';\n\nconst handleChange = debounce((e) => {\n  setQuery(e.target.value);\n}, 300);\n```\n\nThis will delay the API calls by 300ms.",
//   "votes": [{VoteTable}],
//   "comments": [{commentTable}],
//   "isAccepted": true
// }

import { DB, ANSWER, VOTE, COMMENT, PROFILE } from "../names";
import {
  Permission,
  RelationMutate,
  RelationshipType,
  Role,
  tablesdb,
} from "../server.config";

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
      type: RelationshipType.OneToOne,
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

    // votes — integer (upvotes - downvotes)
    tablesdb.createRelationshipColumn({
      databaseId: DB,
      tableId: ANSWER,
      relatedTableId: VOTE,
      type: RelationshipType.OneToMany,
      key: "votes",
      onDelete: RelationMutate.Cascade,
    }),

    // comments — number of comments on this answer
    tablesdb.createRelationshipColumn({
      databaseId: DB,
      tableId: ANSWER,
      relatedTableId: COMMENT,
      type: RelationshipType.OneToMany,
      key: "comments",
      onDelete: RelationMutate.Cascade,
    }),

    // isAccepted — whether this is the accepted answer
    tablesdb.createBooleanColumn({
      databaseId: DB,
      tableId: ANSWER,
      key: "isAccepted",
      required: false,
      xdefault: false,
    }),
  ]);
}
