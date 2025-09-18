import { NextResponse, NextRequest } from "next/server";
import seedOrGetDB from "./appwrite/seed";
import createOrGetStorageBucket from "./appwrite/storageBucket";

export async function middleware(request: NextRequest) {
  await Promise.all([seedOrGetDB(), createOrGetStorageBucket()]);

  return NextResponse.next();
}

export const config = {
  /**
   * Match all routes except thos starts with
   * api
   * _next/static
   * _next/image
   * favicon.com
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
