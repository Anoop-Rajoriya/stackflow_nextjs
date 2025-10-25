/************************************************
 *********** GET: show app analytics  **********
 ************************************************/

import { ANSWER, DB, PROFILE, QUESTION } from "@/appwrite/names";
import { Query, tablesdb } from "@/appwrite/server.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 1️⃣ Fetch all rows
    const [questionRows, answerRows, profileRows] = await Promise.all([
      tablesdb.listRows({ databaseId: DB, tableId: QUESTION, queries: [Query.select(["*", "author.*"])] }),
      tablesdb.listRows({ databaseId: DB, tableId: ANSWER, queries: [Query.select(["*", "author.*"])] }),
      tablesdb.listRows({ databaseId: DB, tableId: PROFILE, queries: [Query.select(["*", "reputation"])] }),
    ]);

    // 2️⃣ Compute popularity score for questions
    const scoredQuestions = questionRows.rows.map((q: any) => {
      const views = Array.isArray(q.views) ? q.views.length : 0;
      const comments = q.comments || 0;
      const answers = q.answers || 0;
      const reputation = q.author?.reputation || 0;

      const popularityScore = views * 0.4 + comments * 0.8 + answers * 1.2 + reputation * 0.5;
      return { ...q, popularityScore };
    });

    const topQuestions = scoredQuestions
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 3)
      .map((q) => ({
        $id: q.$id,
        title: q.title,
        tags: q.tags,
        authorName: q.author?.name,
        votes: q.votes,
        answers: q.answers,
        comments: q.comments,
        views: Array.isArray(q.views) ? q.views.length : 0,
      }));

    // 3️⃣ Sort top answers by votes
    const topAnswers = answerRows.rows
      .sort((a, b) => (b.votes || 0) - (a.votes || 0))
      .slice(0, 3)
      .map((a) => ({
        $id: a.$id,
        body: a.body,
        authorName: a.author?.name,
        votes: a.votes,
        questionId: a.questionId,
      }));

    // 4️⃣ Sort top users by reputation
    const topUsers = profileRows.rows
      .sort((a, b) => (b.reputation || 0) - (a.reputation || 0))
      .slice(0, 3)
      .map((u) => ({
        $id: u.$id,
        name: u.name,
        reputation: u.reputation,
        avatar: u.avatar || null,
      }));

    // 5️⃣ Return all analytics
    return NextResponse.json({
      topQuestions,
      topAnswers,
      topUsers,
      totalQuestion: questionRows.total,
      totalAnswers: answerRows.total,
      totalUsers: profileRows.total,
    });
  } catch (error) {
    console.error("[GET /home] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
