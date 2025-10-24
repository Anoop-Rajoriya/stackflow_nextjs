/************************************************
 *********** GET: list target comments  *********
 ********** POST: create target comment *********
 ************************************************/

import { ANSWER, COMMENT, DB, PROFILE, QUESTION } from "@/appwrite/names";
import { ID, Query, tablesdb, verifyUser } from "@/appwrite/server.config";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const targetId = searchParams.get("targetId");
    const targetType = searchParams.get("targetType");
    // 1. Fetch All Comments
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.select(["*", "author.*"]),
    ];
    if (targetId && targetId.trim())
      queries.push(Query.equal("targetId", targetId));

    const commentRows = await tablesdb.listRows({
      databaseId: DB,
      tableId: COMMENT,
      queries,
    });
    // 2. Return Response
    return NextResponse.json({ comments: commentRows.rows });
  } catch (error) {
    console.error("[POST /comment] error:", error);
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
    const { targetId, targetType, body } = await req.json();
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
    // 2. Validation Input
    let targetRow = await tablesdb.getRow({
      databaseId: DB,
      tableId: targetType === "question" ? QUESTION : ANSWER,
      rowId: targetId,
      queries: [Query.select(["*", "author.*"])],
    });
    if (!targetRow || !body || !body.trim()) {
      return NextResponse.json(
        { error: "Missing or invalid fields content" },
        { status: 400 }
      );
    }
    if (String(targetRow.author.$id) === String(profileRow.$id)) {
      return NextResponse.json(
        { error: `Not answer own ${targetType}` },
        { status: 401 }
      );
    }
    // 3. Create Comment
    const commentRow = await tablesdb.createRow({
      databaseId: DB,
      tableId: COMMENT,
      rowId: ID.unique(),
      data: { body, targetId, targetType, author: profileRow.$id },
    });
    // 4. Update Relations
    if (targetType === "question") {
      await tablesdb.updateRow({
        databaseId: DB,
        tableId: QUESTION,
        rowId: targetId,
        data: { comments: (targetRow.comments ?? 0) + 1 },
      });
    }
    // 5. Return Response
    return NextResponse.json({ createdComment: commentRow });
  } catch (error) {
    console.error("[POST /comment] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
