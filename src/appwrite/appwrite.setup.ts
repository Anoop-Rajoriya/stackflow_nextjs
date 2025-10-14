import { BUCKET, DB } from "./names";
import { Permission, Role, storage, tablesdb } from "./server.config";
import createProfileTable from "./tables/profile";
import createQuestionTable from "./tables/question";
import createAnswerTable from "./tables/answer";
import createCommentTable from "./tables/comment";
import createVoteTable from "./tables/vote";

/* ---------------- Setup Helpers ---------------- */
async function ensureDatabase() {
  try {
    await tablesdb.get({ databaseId: DB });
  } catch {
    console.log(`Creating database "${DB}"...`);
    await tablesdb.create({ databaseId: DB, name: DB });

    // Create required tables
    await Promise.all([
      createProfileTable(),
      createQuestionTable(),
      createAnswerTable(),
      createCommentTable(),
      createVoteTable(),
    ]);
    console.log(`Database "${DB}" and tables created`);
  }
}

async function ensureBucket() {
  try {
    await storage.getBucket({ bucketId: BUCKET });
  } catch {
    console.log(`Creating bucket "${BUCKET}"...`);
    await storage.createBucket({
      bucketId: BUCKET,
      name: BUCKET,
      permissions: [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ],
      allowedFileExtensions: ["jpg", "png", "gif", "jpeg", "webp", "heic"],
    });
    console.log(`Bucket "${BUCKET}" created`);
  }
}

/* ---------------- Main Setup ---------------- */
export default async function appwriteSetup() {
  try {
    await ensureDatabase();
    await ensureBucket();
  } catch (err) {
    console.error("Appwrite setup failed:", err);
  }
}
