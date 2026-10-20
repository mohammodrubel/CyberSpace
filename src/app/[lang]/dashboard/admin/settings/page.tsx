import { getAuthToken, BACKEND_URL } from "@/lib/server-auth";
import { getDict, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

async function fetchSettings(token: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/settings`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return { showPrices: true, showStock: true };
    const data = await res.json();
    const arr: { key: string; value: boolean }[] = data.data ?? [];
    return {
      showPrices: arr.find((s) => s.key === "showPrices")?.value ?? true,
      showStock: arr.find((s) => s.key === "showStock")?.value ?? true,
    };
  } catch {
    return { showPrices: true, showStock: true };
  }
}

export default async function AdminSettingsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const token = await getAuthToken();
  const settings = token ? await fetchSettings(token) : { showPrices: true, showStock: true };

  return (
    <div>
      <div className="dash-page-header">
        <h1 className="dash-page-title">{t.dash.settings}</h1>
      </div>
      <SettingsClient initialSettings={settings} t={t} />
    </div>
  );
}
