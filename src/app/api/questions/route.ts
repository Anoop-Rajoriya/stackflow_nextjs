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
    console.log(rowId);
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
    console.error("[POST /question] error:", error);
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
    // 1. Extract search & filter query params
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("search")?.trim() || "";
    const tagsQuery = searchParams.get("tags")?.trim();
    const filter = searchParams.get("filter") || "newest";

    // 2. Build DB query dynamically
    const dbQueries: any[] = [
      Query.select(["*", "author.*", "answers.*", "comments.*", "votes.*"]),
    ];

    // Add search (title or body) if provided
    if (searchQuery) {
      dbQueries.push(
        Query.or([
          Query.search("title", searchQuery),
          Query.search("body", searchQuery),
        ])
      );
    }

    // Filter by tags if provided (comma separated)
    if (tagsQuery) {
      const tagsArray = tagsQuery.split(",").map((t) => t.trim());
      dbQueries.push(Query.contains("tags", tagsArray));
    }

    // Sorting / filtering
    switch (filter) {
      case "votes":
        dbQueries.push(Query.orderDesc("votesCount"));
        break;
      case "views":
        dbQueries.push(Query.orderDesc("views"));
        break;
      case "answers":
        dbQueries.push(Query.orderDesc("answersCount"));
        break;
      case "newest":
      default:
        dbQueries.push(Query.orderDesc("$createdAt"));
        break;
    }

    // 3. Fetch from DB
    const questionRes = await tablesdb.listRows({
      databaseId: DB,
      tableId: QUESTION,
      queries: dbQueries,
    });

    // 4. Prepare response data
    const questionData = questionRes.rows.map((q: any) => ({
      id: q.$id,
      createdAt: q.$createdAt,
      updatedAt: q.$updatedAt,
      title: q.title,
      body: q.body,
      tags: q.tags || [],
      votes: q.votes?.length || 0,
      answers: q.answers?.length || 0,
      comments: q.comments?.length || 0,
      views: q.views || 0,
      author: q.author
        ? {
            name: q.author.name,
            reputation: q.author.reputation,
            avatarUrl: q.author.avatar,
          }
        : null,
    }));

    return NextResponse.json({
      total: questionData.length,
      questions: questionData,
    });
  } catch (error) {
    console.error("[GET /question] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
