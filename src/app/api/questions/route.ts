import { DB, PROFILE, QUESTION } from "@/lib/appwrite/names";
import { ID, Query, tablesdb } from "@/lib/appwrite/server.config";
import { NextRequest, NextResponse } from "next/server";

type Params = {};

export async function GET(req: NextRequest, params: Params) {
  try {
    const questions = await tablesdb.listRows({
      databaseId: DB,
      tableId: QUESTION,
    });

    if (!questions.rows.length) {
      return NextResponse.json(
        { message: "No question available", questions: [], total: 0 },
        { status: 200 }
      );
    }
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
