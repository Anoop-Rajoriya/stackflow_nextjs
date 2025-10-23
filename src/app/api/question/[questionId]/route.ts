/*************************************************
 ***********  GET: questions details *************
 ***********  PATCH: update quesiton  ************
 ***********  ELETE: update quesiton  ************
 *************************************************/

import { ANSWER, DB, QUESTION } from "@/appwrite/names";
import { Query, tablesdb } from "@/appwrite/server.config";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ questionId: string }>;

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    const { questionId } = await params;
    // 1. Fetch Questions Details
    const queRow = await tablesdb.getRow({
      databaseId: DB,
      tableId: QUESTION,
      rowId: questionId,
      queries: [Query.select(["*", "author.*"])],
    });
    // 2. Fetch Related Answers
    const ansRows = await tablesdb.listRows({
      databaseId: DB,
      tableId: ANSWER,
      queries: [
        Query.equal("question", questionId),
        Query.select(["*", "author.*"]),
        Query.orderDesc("$createdAt"),
      ],
    });
    // 3. Return Response
    return NextResponse.json({ question: queRow, answers: ansRows.rows });
  } catch (error) {
    console.error("[GET /question/quesitonId] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
export const PATCH = async (req: NextRequest) => {};
export const DELETE = async (req: NextRequest) => {};
