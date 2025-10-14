// {
// "userId": "usr_01",
// "name": "Anoop Rajoriya",
// "email": "anoop@example.com",
// "avatar": "https://api.dicebear.com/8.x/identicon/svg?seed=anoop",
// "about": "Full-stack dev passionate about React and Node.js.",
// "reputation": 1520,
//  "badges": {
//  "gold": 3,
//  "silver": 8,
//  "bronze": 15
//  },
//  "joinedAt": "2024-05-14T10:12:00Z"
//  }

import { tablesdb, Permission, Role } from "../server.config";
import { DB, PROFILE } from "../names";

export default async function createProfile() {
  // 1 Create the table
  await tablesdb.createTable({
    databaseId: DB,
    tableId: PROFILE,
    name: PROFILE,
    permissions: [
      Permission.read(Role.any()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ],
  });

  // 2 Create all columns
  await Promise.all([
    // userId
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "userId",
      size: 50,
      required: true,
    }),

    // name
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "name",
      size: 50,
      required: true,
    }),

    // email
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "email",
      size: 50,
      required: true,
    }),

    // avatar URL
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "avatar",
      size: 500,
      required: false,
    }),

    // about
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "about",
      size: 500,
      required: false,
    }),

    // reputation
    tablesdb.createIntegerColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "reputation",
      required: false,
      xdefault: 1,
    }),

    // badges (gold, silver, bronze) — store as object (JSON)
    // tablesdb.createJsonColumn({
    //   databaseId: DB,
    //   tableId: PROFILE,
    //   key: "badges",
    //   required: true,
    //   default: JSON.stringify({ gold: 0, silver: 0, bronze: 0 }),
    // }),

    // joinedAt
    tablesdb.createDatetimeColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "joinedAt",
      required: true,
    }),
  ]);
}
