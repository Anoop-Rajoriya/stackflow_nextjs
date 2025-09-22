import { Permission } from "node-appwrite";
import { BUCKET } from "./names";
import { storage } from "./server.config";
import { Role } from "appwrite";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket({ bucketId: BUCKET });
  } catch (error) {
    try {
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
    } catch (error) {
      console.log("File:- failed to create storage bucket: ", error);
    }
  }
}
