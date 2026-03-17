import {
  buildAdminSessionCookie,
  validateAdminCredentials,
} from "@/lib/admin-session";
import { NextResponse } from "next/server";

function redirectToLogin(request: Request, message: string) {
  const url = new URL("/admin/login", request.url);
  url.searchParams.set("error", message);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const result = validateAdminCredentials(username, password);
  if (!result.ok) {
    return redirectToLogin(request, result.message);
  }

  const cookie = buildAdminSessionCookie(result.username);
  const response = NextResponse.redirect(new URL("/admin/projects", request.url), 303);
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
