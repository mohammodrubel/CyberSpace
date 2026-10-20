import { getAuthToken, BACKEND_URL, getServerSession } from "@/lib/server-auth";
import { getDict, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import UsersClient from "./UsersClient";

export const dynamic = "force-dynamic";

interface User {
  id: number;
  name?: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

async function fetchUsers(token: string): Promise<User[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return (await res.json()).data ?? [];
  } catch {
    return [];
  }
}

export default async function AdminUsersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const token = await getAuthToken();
  const session = await getServerSession();
  const users = token ? await fetchUsers(token) : [];

  return (
    <div>
      <div className="dash-page-header">
        <h1 className="dash-page-title">{t.dash.users}</h1>
      </div>
      <UsersClient users={users} lang={lang} t={t} currentUserId={parseInt(session?.id ?? "0", 10)} />
    </div>
  );
}
