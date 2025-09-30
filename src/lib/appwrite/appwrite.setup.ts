import { BUCKET, DB } from "./names";
import { Permission, Role, storage, tablesdb } from "./server.config";
import createAnswerTable from "./tables/answer";
import createQuestionTable from "./tables/question";
import createUserProfileTable from "./tables/userProfile";

/* ---------------- Setup Helpers ---------------- */
async function ensureDatabase() {
  try {
    await tablesdb.get({ databaseId: DB });
    console.log(`Database "${DB}" already exists`);
  } catch {
    console.log(`Creating database "${DB}"...`);
    await tablesdb.create({ databaseId: DB, name: DB });

    // Create required tables
    await Promise.all([
      createUserProfileTable(),
      createQuestionTable(),
      createAnswerTable(),
    ]);
    console.log(`Database "${DB}" and tables created`);
  }
}

async function ensureBucket() {
  try {
    await storage.getBucket({ bucketId: BUCKET });
    console.log(`Bucket "${BUCKET}" already exists`);
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
  console.log("Starting Appwrite setup...");
  try {
    await ensureDatabase();
    await ensureBucket();
    console.log("Appwrite setup completed successfully");
  } catch (err) {
    console.error("Appwrite setup failed:", err);
  }
}
