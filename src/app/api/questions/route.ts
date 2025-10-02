import { DB, PROFILE, QUESTION } from "@/lib/appwrite/names";
import { ID, Query, tablesdb } from "@/lib/appwrite/server.config";
import { NextRequest, NextResponse } from "next/server";

type Params = {};

export async function GET(req: NextRequest) {
  try {
    // Collect data and validate
    const response = await tablesdb.listRows({
      databaseId: DB,
      tableId: QUESTION,
      queries: [Query.select(["*", "userId.fullName", "userId.reputation"])],
    });

    if (!response.total) {
      return NextResponse.json(
        { message: "Questions not availble", questions: null, total: 0 },
        { status: 200 }
      );
    }

    // Transformed response data
    const questions = response.rows.map((q) => ({
      id: q.$id,
      title: q.title,
      body: q.body,
      tags: q.tags,
      status: q.status,
      authorName: q.userId.fullName,
      authorReputation: q.userId.reputation,
      authorId: q.userId.$id,
      createdAt: new Date(q.$createdAt).toDateString(),
      updatedAt: new Date(q.$updatedAt).toDateString(),
    }));

    // Return response
    return NextResponse.json(
      {
        message: "All Questions",
        questions: questions,
        total: questions.length,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Something wrong" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get user id
    const { title, body, tags, userId } = await req.json();

    // Validate user id
    const user = await tablesdb.getRow({
      databaseId: DB,
      tableId: PROFILE,
      rowId: userId,
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    // Praparing response data
    const response = await tablesdb.createRow({
      databaseId: DB,
      tableId: QUESTION,
      rowId: ID.unique(),
      data: { title, body, tags, userId, status: "open" },
    });

    return NextResponse.json(
      { message: "Question successfully posted", id: response.$id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Something wrong" }, { status: 500 });
  }
}
