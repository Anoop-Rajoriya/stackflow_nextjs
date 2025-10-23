// GET: list all questions, POST: create question
import { NextRequest, NextResponse } from "next/server";
import { ID, Permission, Query, Role } from "node-appwrite";
import { DB, PROFILE, QUESTION } from "@/appwrite/names";
import { tablesdb, verifyUser } from "@/appwrite/server.config";

export async function POST(req: NextRequest) {
  try {
    const { title, body, tags } = await req.json();
    const authHeader = req.headers.get("authorization");

    // --- Validate input ---
    if (!title || !body || !Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // --- Verify user ---
    const user = await verifyUser(authHeader);

    // --- Get author profile ---
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

    const author = {
      id: profileRes.rows[0].$id,
      userId: user.$id,
    };

    // --- Create question row ---
    const questionRes = await tablesdb.createRow({
      databaseId: DB,
      tableId: QUESTION,
      rowId: ID.unique(),
      data: { title, body, tags, author: author.id },
      permissions: [
        Permission.delete(Role.user(author.userId)),
        Permission.update(Role.user(author.userId)),
      ],
    });

    return NextResponse.json({ question: questionRes }, { status: 201 });
  } catch (error) {
    console.error("[POST /questions] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
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
