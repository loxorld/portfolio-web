import { getAdminSession } from "@/lib/admin-session";
import { redirect } from "next/navigation";

export default async function AdminIndexPage() {
  const session = await getAdminSession();
  redirect(session ? "/admin/projects" : "/admin/login");
}
