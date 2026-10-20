import { notFound } from "next/navigation";
import { isLocale, getDict } from "@/lib/i18n";
import HomeContentClient from "./HomeContentClient";

export const dynamic = "force-dynamic";

export default async function HomeContentPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return <HomeContentClient t={t} />;
}
