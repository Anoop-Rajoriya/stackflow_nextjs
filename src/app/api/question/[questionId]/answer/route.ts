/*************************************************
 ***********  POST: Create Answer ****************
 *************************************************/

import { ANSWER, DB, PROFILE, QUESTION } from "@/appwrite/names";
import {
  ID,
  Permission,
  Query,
  Role,
  tablesdb,
  verifyUser,
} from "@/appwrite/server.config";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ questionId: string }>;
};

export const POST = async (req: NextRequest, { params }: Params) => {
  try {
    const { questionId } = await params;
    const { body } = await req.json();
    const authHeader = req.headers.get("Authorization");
    // 1. Authenticate User
    const user = await verifyUser(authHeader);
    const profileRows = await tablesdb.listRows({
      databaseId: DB,
      tableId: PROFILE,
      queries: [Query.equal("userId", user.$id)],
    });
    const profileRow = profileRows.rows[0];
    if (!profileRow) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }
    const queRow = await tablesdb.getRow({
      databaseId: DB,
      tableId: QUESTION,
      rowId: questionId,
    });
    // 2. Prevent Own Answering
    if (queRow.author.$id.toString() === profileRow.$id.toString()) {
      return NextResponse.json(
        { error: "Not answer own question" },
        { status: 401 }
      );
    }
    // 3. Validate Input
    if (!body || !body.trim() || !queRow) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // 4. Create Answer
    const ansRow = await tablesdb.createRow({
      databaseId: DB,
      tableId: ANSWER,
      rowId: ID.unique(),
      data: {
        author: profileRow.$id,
        question: queRow.$id,
        body,
      },
      permissions: [
        Permission.delete(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
      ],
    });
    // 5. Update Relations
    await tablesdb.updateRow({
      databaseId: DB,
      tableId: QUESTION,
      rowId: queRow.$id,
      data: {
        answers: (queRow.answers ?? 0) + 1,
      },
    });
    // 6. Return Response
    return NextResponse.json({ createdAnswer: ansRow });
  } catch (error) {
    console.error("[GET /question/quesitonId/answer] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
