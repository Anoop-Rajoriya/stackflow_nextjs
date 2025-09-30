import { NextRequest, NextResponse } from "next/server";
import { ID, Query, tablesdb } from "@/lib/appwrite/server.config";
import { DB, PROFILE, QUESTION } from "@/lib/appwrite/names";

export async function POST(req: NextRequest) {
  try {
    const { title, body, tags, userId } = await req.json();
    const users = await tablesdb.listRows({
      databaseId: DB,
      tableId: PROFILE,
      queries: [Query.equal("userId", userId)],
    });

    if (!users.rows[0]) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

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
