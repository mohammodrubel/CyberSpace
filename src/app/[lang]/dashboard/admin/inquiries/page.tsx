import { getAuthToken, BACKEND_URL } from "@/lib/server-auth";
import { getDict, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import InquiriesClient from "./InquiriesClient";

export const dynamic = "force-dynamic";

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  message?: string;
  status: string;
  createdAt: string;
  product?: { translations?: { lang: string; name: string }[] };
  submittedBy?: { name?: string; email: string } | null;
}

async function fetchInquiries(token: string): Promise<Inquiry[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/inquiries`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

export default async function AdminInquiriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const token = await getAuthToken();
  const inquiries = token ? await fetchInquiries(token) : [];

  return (
    <div>
      <div className="dash-page-header">
        <h1 className="dash-page-title">{t.dash.inquiries}</h1>
      </div>
      <InquiriesClient inquiries={inquiries} lang={lang} t={t} />
    </div>
  );
}
