// GET: get single question, PATCH: update, DELETE: delete

import { DB, QUESTION } from "@/appwrite/names";
import { Query, tablesdb } from "@/appwrite/server.config";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ questionId: string }>;
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    // 1. Extract slug
    const { questionId } = await params;

    // 2. Fetch Question
    const questionRes = await tablesdb.getRow({
      databaseId: DB,
      tableId: QUESTION,
      rowId: questionId,
      queries: [Query.select(["*", "author.*"])],
    });

    // 3. return response
    return NextResponse.json({ question: questionRes });
  } catch (error) {
    console.log("[GET /questions/[quesitonId]] error: ", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
export async function PATCH(req: NextRequest) {}
export async function DELETE(req: NextRequest) {}
