import { getAdminSessionCookieName } from "@/lib/admin-session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(
    new URL("/admin/login?loggedOut=1", request.url),
    303,
  );
  response.cookies.delete(getAdminSessionCookieName());
  return response;
}
