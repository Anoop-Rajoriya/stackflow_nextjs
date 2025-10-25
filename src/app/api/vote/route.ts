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

    // 1️⃣ Authenticate user
    const user = await verifyUser(authHeader);
    const profileRows = await tablesdb.listRows({
      databaseId: DB,
      tableId: PROFILE,
      queries: [Query.equal("userId", user.$id)],
    });
    const profileRow = profileRows.rows[0];
    if (!profileRow)
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );

    // 2️⃣ Fetch target
    const targetTable = targetType === "question" ? QUESTION : ANSWER;
    const targetRow = await tablesdb.getRow({
      databaseId: DB,
      tableId: targetTable,
      rowId: targetId,
    });
    if (!targetRow)
      return NextResponse.json({ error: "Target not found" }, { status: 404 });

    if (String(targetRow.author.$id) === String(profileRow.$id))
      return NextResponse.json(
        { error: `You cannot vote your own ${targetType}` },
        { status: 401 }
      );

    // 3️⃣ Fetch target author's profile
    const authorProfileId = targetRow.author;
    const authorProfile = await tablesdb.getRow({
      databaseId: DB,
      tableId: PROFILE,
      rowId: authorProfileId,
    });

    // 4️⃣ Check existing vote
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
    let reputationChange = 0;

    // helper function for rep value
    const getRepValue = (type: "upVote" | "downVote", isQuestion: boolean) => {
      if (type === "upVote") return isQuestion ? 5 : 10;
      return -2;
    };

    // 5️⃣ Voting logic
    if (!prevVote) {
      // → No previous vote, create new one
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
      reputationChange = getRepValue(voteType, targetType === "question");
    } else if (prevVote.voteType === voteType) {
      // → User clicked same vote → remove it
      await tablesdb.deleteRow({
        databaseId: DB,
        tableId: VOTE,
        rowId: prevVote.$id,
      });
      voteChange = voteType === "upVote" ? -1 : 1;
      reputationChange = -getRepValue(voteType, targetType === "question");
      newVoteType = null;
    } else {
      // → User switched from up ↔ down
      await tablesdb.updateRow({
        databaseId: DB,
        tableId: VOTE,
        rowId: prevVote.$id,
        data: { voteType },
      });
      voteChange = voteType === "upVote" ? 2 : -2; // net +2 or −2
      const prevRep = getRepValue(prevVote.voteType, targetType === "question");
      const newRep = getRepValue(voteType, targetType === "question");
      reputationChange = newRep - prevRep; // revert + apply new
    }

    // 6️⃣ Update votes on target
    const updatedTarget = await tablesdb.updateRow({
      databaseId: DB,
      tableId: targetTable,
      rowId: targetId,
      data: {
        votes: (targetRow.votes ?? 0) + voteChange,
      },
    });

    // 7️⃣ Update author reputation
    await tablesdb.updateRow({
      databaseId: DB,
      tableId: PROFILE,
      rowId: authorProfileId,
      data: {
        reputation: (authorProfile.reputation ?? 0) + reputationChange,
      },
    });

    // 8️⃣ Return response
    return NextResponse.json({
      targetId,
      newVoteType,
      totalVotes: updatedTarget.votes,
      reputationChange,
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
