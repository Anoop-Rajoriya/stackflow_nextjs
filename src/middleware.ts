import { NextResponse, NextRequest } from "next/server";
import getOrCreateDB from "./lib/appwrite/setupDB";
import getOrCreateStorage from "./lib/appwrite/setupStorage";

export async function middleware(request: NextRequest) {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);

  return NextResponse.next();
}

export const config = {
  /* match all request paths except for the the ones that starts with:
  - api
  - _next/static
  - _next/image
  - favicon.com

  */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
