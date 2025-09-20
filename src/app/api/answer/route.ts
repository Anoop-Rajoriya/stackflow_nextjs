import { ANSWER, DB_NAME } from "@/appwrite/names";
import { tabledb, users, ID } from "@/appwrite/server.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { questionId, answer, authorId } = await req.json();
    const response = await tabledb.createRow({
      databaseId: DB_NAME,
      tableId: ANSWER,
      rowId: ID.unique(),
      data: { content: answer, questionId, authorId },
    });

    const prefs = await users.getPrefs({ userId: authorId });
    await users.updatePrefs({
      userId: authorId,
      prefs: { reputation: Number(prefs.reputation) + 1 },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error creating answer" },
      { status: error?.status || error?.code || 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const { answerId } = await req.json();
    const answer = await tabledb.getRow({
      databaseId: DB_NAME,
      tableId: ANSWER,
      rowId: answerId,
    });

    const response = await tabledb.deleteRow({
      databaseId: DB_NAME,
      tableId: ANSWER,
      rowId: answerId,
    });

    const prefs = await users.getPrefs({ userId: answer.authorId });
    await users.updatePrefs({
      userId: answer.authorId,
      prefs: {
        reputation: Number(prefs.reputation) - 1,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error deleting answer" },
      { status: error?.status || error?.code || 500 }
    );
  }
}
