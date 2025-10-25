/************************************************
 ***********  GET: list questions  **************
 *********** POST: create quesiton **************
 ***********************************************/

import { NextRequest, NextResponse } from "next/server";
import { DB, PROFILE, QUESTION } from "@/appwrite/names";
import {
  ID,
  Role,
  Query,
  tablesdb,
  verifyUser,
  Permission,
} from "@/appwrite/server.config";

export const GET = async (req: NextRequest) => {
  try {
    // 1. Fetch All Questions
    const queRows = await tablesdb.listRows({
      databaseId: DB,
      tableId: QUESTION,
      queries: [Query.select(["*", "author.*"]), Query.orderDesc("$createdAt")],
    });

    // 2. Return Response
    return NextResponse.json({ questions: queRows.rows });
  } catch (error) {
    console.error("[GET /question] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { title, body, tags } = await req.json();
    const authHeader = req.headers.get("authorization");
    // 1. Authenticate User
    const user = await verifyUser(authHeader);
    const profileRows = await tablesdb.listRows({
      databaseId: DB,
      tableId: PROFILE,
      queries: [Query.equal("userId", user.$id)],
    });
    const profileRow = profileRows.rows[0];
    if (!profileRow) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }
    // 2. Validate Input
    if (!title || !body || !Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // 3. Create Quesiton
    const questionRow = await tablesdb.createRow({
      databaseId: DB,
      tableId: QUESTION,
      rowId: ID.unique(),
      data: { title, body, tags, author: profileRow.$id },
      permissions: [
        Permission.delete(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
      ],
    });

    // 4. Upvote Reputation
    await tablesdb.updateRow({
      databaseId: DB,
      tableId: PROFILE,
      rowId: profileRow.$id,
      data: {
        reputation: (profileRow.reputation ?? 0) + 1,
      },
    });
    // 5. Return Response
    return NextResponse.json({ createdQuestion: questionRow });
  } catch (error) {
    console.error("[POST /question] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
