/************************************************
 *********** GET: show votes  *********
 ********** POST: create vote *********
 ************************************************/

import { ANSWER, DB, PROFILE, QUESTION, VOTE } from "@/appwrite/names";
import { ID, Query, tablesdb, verifyUser } from "@/appwrite/server.config";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const targetId = searchParams.get("targetId");
    // 1. Fetch Votes
    if (!targetId) {
      return NextResponse.json({ error: "Invalid targetId" }, { status: 400 });
    }
    const voteRows = await tablesdb.listRows({
      databaseId: DB,
      tableId: VOTE,
      queries: [Query.equal("targetId", targetId)],
    });

    if (!voteRows.rows || voteRows.rows.length === 0) {
      return NextResponse.json({
        upVotes: 0,
        downVotes: 0,
        totalVotes: 0,
      });
    }

    // 3. Compute totals
    const upVotes = voteRows.rows.filter((v) => v.voteType === "upVote").length;
    const downVotes = voteRows.rows.filter(
      (v) => v.voteType === "downVote"
    ).length;
    const totalVotes = upVotes - downVotes;

    // 4. Return computed results
    return NextResponse.json({
      upVotes,
      downVotes,
      totalVotes,
    });
  } catch (error) {
    console.error("[Get /vote] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { voteType, targetId, targetType } = await req.json();
    const authHeader = req.headers.get("authorization");
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
    // 2. Get Target
    const targetTable = targetType === "question" ? QUESTION : ANSWER;
    const targetRow = await tablesdb.getRow({
      databaseId: DB,
      tableId: targetTable,
      rowId: targetId,
    });
    if (!targetRow) {
      return NextResponse.json({ error: "Target not found" }, { status: 404 });
    }
    if (String(targetRow.author.$id) === String(profileRow.$id)) {
      return NextResponse.json(
        { error: `You cannot vote your own ${targetType}` },
        { status: 401 }
      );
    }
    // 3. Check Existing Vote
    const existingVotes = await tablesdb.listRows({
      databaseId: DB,
      tableId: VOTE,
      queries: [
        Query.equal("author", profileRow.$id),
        Query.equal("targetId", targetId),
      ],
    });
    const prevVote = existingVotes.rows[0];
    let newVoteType = voteType;
    let voteChange = 0;
    // 4. Create Vote
    if (!prevVote) {
      // no previous vote → create new
      await tablesdb.createRow({
        databaseId: DB,
        tableId: VOTE,
        rowId: ID.unique(),
        data: {
          author: profileRow.$id,
          targetId,
          voteType,
        },
      });
      voteChange = voteType === "upVote" ? 1 : -1;
    } else if (prevVote.voteType === voteType) {
      // same vote again → remove
      await tablesdb.deleteRow({
        databaseId: DB,
        tableId: VOTE,
        rowId: prevVote.$id,
      });
      voteChange = voteType === "upVote" ? -1 : 1; // reverse
      newVoteType = null;
    } else {
      // switch between up and down
      await tablesdb.updateRow({
        databaseId: DB,
        tableId: VOTE,
        rowId: prevVote.$id,
        data: { voteType },
      });
      voteChange = voteType === "upVote" ? 2 : -2; // switch adds 2 or removes 2
    }
    // 5. Update Votes
    const updated = await tablesdb.updateRow({
      databaseId: DB,
      tableId: targetTable,
      rowId: targetId,
      data: {
        votes: (targetRow.votes ?? 0) + voteChange,
      },
    });
    // 6. Return Response
    return NextResponse.json({
      targetId,
      newVoteType,
      totalVotes: updated.votes,
    });
  } catch (error) {
    console.error("[POST /vote] error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
