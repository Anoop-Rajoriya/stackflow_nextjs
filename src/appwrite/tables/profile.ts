import { tablesdb, Permission, Role } from "../server.config";
import { DB, PROFILE } from "../names";

/**
 * {
 * user, r
 * name, r
 * email, r
 * avatar,
 * about,
 * reputation,
 * rank, bronze, silver, gold
 *
 * }
 */

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
      key: "user",
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

    // rank
    tablesdb.createEnumColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "rank",
      elements: ["bronze", "silver", "gold"],
      required: false,
      xdefault: "bronze",
    }),
  ]);
}
