// GET: list all answers for a question, POST: create answer

import { ANSWER, DB, PROFILE, QUESTION } from "@/appwrite/names";
import {
  ID,
  Permission,
  Query,
  Role,
  tablesdb,
  verifyAppwriteJwt,
} from "@/appwrite/server.config";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ questionId: string }>;
};

export async function POST(req: NextRequest, { params }: Params) {
  try {
    // 1. Auth
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or malformed auth token" },
        { status: 401 }
      );
    }

    const jwt = authHeader.replace("Bearer ", "");
    const user = await verifyAppwriteJwt(jwt);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 2. Validate
    const { body } = await req.json();
    const { questionId } = await params;
    const targetQuestion = await tablesdb.getRow({
      databaseId: DB,
      tableId: QUESTION,
      rowId: questionId,
    });

    if (!body?.trim() || !targetQuestion) {
      return NextResponse.json(
        { error: "Missing required fields or invalid" },
        { status: 400 }
      );
    }

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

    // 3. Create Answer
    const answerRes = await tablesdb.createRow({
      databaseId: DB,
      tableId: ANSWER,
      rowId: ID.unique(),
      data: {
        author: authorId,
        question: targetQuestion.$id,
        body,
      },
      permissions: [
        Permission.delete(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
      ],
    });

    // 4. Update Question's Answer Count
    await tablesdb.updateRow({
      databaseId: DB,
      tableId: QUESTION,
      rowId: targetQuestion.$id,
      data: {
        answers: (targetQuestion.answers ?? 0) + 1, // 👈 increment
      },
    });

    // 5. Return Response
    return NextResponse.json({
      message: "Answer created successfully",
      answerId: answerRes.$id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { questionId } = await params;
    const answerRes = await tablesdb.listRows({
      databaseId: DB,
      tableId: ANSWER,
      queries: [
        Query.equal("question", questionId),
        Query.select(["*", "author.*"]),
        Query.orderDesc("$createdAt"),
      ],
    });

    return NextResponse.json({ answers: answerRes.rows });
  } catch (error) {
    console.log("[GET /questions/[quesitonId]/answers] error: ", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
