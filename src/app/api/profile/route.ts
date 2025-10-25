/************************************************
 *********** GET: show profile details  *********
 *********** POST: update profile details  ******
 *********** DELETE: delete user account  *******
 ************************************************/

import { DB, PROFILE } from "@/appwrite/names";
import { Query, tablesdb, verifyUser } from "@/appwrite/server.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const user = await verifyUser(authHeader);
    const profileRows = await tablesdb.listRows({
      databaseId: DB,
      tableId: PROFILE,
      queries: [Query.equal("userId", user.$id)],
    });

    return NextResponse.json({ profile: profileRows.rows[0] });
  } catch (error) {
    console.error("[Get /profile] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
