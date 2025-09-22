import { Permission, Role } from "node-appwrite";
import { DB, USR_PROFILE } from "../names";
import { tablesdb } from "../server.config";

export default async function createUserProfileTable() {
  // Create Table
  await tablesdb.createTable({
    databaseId: DB,
    tableId: USR_PROFILE,
    name: USR_PROFILE,
    permissions: [
      Permission.read(Role.any()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ],
  });

  /**
   * Create Columns:
   * userid,
   * full name,
   * bio,
   * avatar,
   * email
   *
   */

  await Promise.all([
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: USR_PROFILE,
      key: "userId",
      size: 100,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: USR_PROFILE,
      key: "fullName",
      size: 50,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: USR_PROFILE,
      key: "email",
      size: 50,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: USR_PROFILE,
      key: "bio",
      size: 200,
      required: false,
      xdefault: "",
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: USR_PROFILE,
      key: "avatar",
      size: 200,
      required: false,
    }),
  ]);
}
