import { ATTACHMENT } from "./names";
import { storage } from "./server.config";
import { Permission, Role } from "node-appwrite";

export async function getOrCreateStorageBucket() {
  try {
    await storage.getBucket({ bucketId: ATTACHMENT });
  } catch (error) {
    try {
      await storage.createBucket({
        bucketId: ATTACHMENT,
        name: ATTACHMENT,
        permissions: [
          Permission.read(Role.any()),
          Permission.write(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users()),
        ],
        allowedFileExtensions: ["jpg", "png", "gif", "jpeg", "webp", "heic"],
      });
    } catch (error) {
      console.error("File:- storageBucket error: ", error);
    }
  }
}
