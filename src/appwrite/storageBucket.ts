import { ATTACHMENT } from "./names";
import { storage } from "./server.config";
import { Permission, Role } from "node-appwrite";

export default async function createOrGetStorageBucket() {
  try {
    await storage.getBucket({ bucketId: ATTACHMENT });
  } catch (error) {
    try {
      console.log("Creating Attachment Storage Bucket...");
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
      console.log("Attachment Storage Bucket Created!");
    } catch (error) {
      console.error("File:- storageBucket error: ", error);
    }
  }
}
