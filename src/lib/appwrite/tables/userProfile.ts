import { Permission, Role } from "node-appwrite";
import { DB, PROFILE } from "../names";
import { tablesdb } from "../server.config";

export default async function createUserProfileTable() {
  // Create Table
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

  /**
   * userId: string;
   * fullName: string;
   * email: string;
   * emailVerification: boolean;
   * passwordUpdate: string;
   * reputation: Number;
   * theme?: string;
   * bio?: string;
   * avatar?: string;
   *
   */

  await Promise.all([
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "userId",
      size: 100,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "fullName",
      size: 50,
      required: true,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "email",
      size: 50,
      required: true,
    }),
    tablesdb.createBooleanColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "emailVerification",
      required: true,
    }),
    tablesdb.createDatetimeColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "passwordUpdate",
      required: true,
    }),
    tablesdb.createIntegerColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "reputation",
      required: false,
      xdefault: 1,
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "theme",
      size: 50,
      required: false,
      xdefault: "system",
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "bio",
      size: 200,
      required: false,
      xdefault: "",
    }),
    tablesdb.createStringColumn({
      databaseId: DB,
      tableId: PROFILE,
      key: "avatar",
      size: 200,
      required: false,
    }),
  ]);
}
