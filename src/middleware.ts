import { NextResponse, NextRequest } from "next/server";
import appwriteSetup from "./lib/appwrite/appwrite.setup";

export async function middleware(request: NextRequest) {
  await appwriteSetup();

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
