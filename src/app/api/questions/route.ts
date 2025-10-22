// GET: list all questions, POST: create question
import { NextRequest, NextResponse } from "next/server";
import { ID, Permission, Query, Role } from "node-appwrite";
import { DB, PROFILE, QUESTION } from "@/appwrite/names";
import { tablesdb, verifyAppwriteJwt } from "@/appwrite/server.config";

export async function POST(req: NextRequest) {
  try {
    // 1. Auth
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or malformed auth token" },
        { status: 401 }
      );
    }

    const jwt = authHeader.replace("Bearer ", "").trim();
    const user = await verifyAppwriteJwt(jwt);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 2. Input validation
    const { title, body, tags } = await req.json();
    if (!title || !body) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3. Get user profile
    const profileRes = await tablesdb.listRows({
      databaseId: DB,
      tableId: PROFILE,
      queries: [Query.equal("userId", user.$id)],
    });

    if (!profileRes.rows.length) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    const authorId = profileRes.rows[0].$id;

    // 4. Create question
    const questionData = { title, body, tags, author: authorId };
    const rowId = ID.unique();
    const questionRes = await tablesdb.createRow({
      databaseId: DB,
      tableId: QUESTION,
      rowId,
      data: questionData,
      permissions: [
        Permission.delete(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
      ],
    });

    return NextResponse.json({
      message: "Question created successfully",
      questionId: questionRes.$id,
    });
  } catch (error) {
    console.error("[POST /questions] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // 1. Fetch Quesiton
    const questionEntries = await tablesdb.listRows({
      databaseId: DB,
      tableId: QUESTION,
      queries: [Query.select(["*", "author.*"])],
    });

    // 2. Return Response
    return NextResponse.json({ questions: questionEntries.rows });
  } catch (error) {
    console.error("[GET /questions] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
