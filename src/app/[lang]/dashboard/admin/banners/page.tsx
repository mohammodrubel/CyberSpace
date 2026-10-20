import { notFound } from "next/navigation";
import { isLocale, getDict } from "@/lib/i18n";
import BannersClient from "./BannersClient";

export const dynamic = "force-dynamic";

export default async function BannersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return <BannersClient t={t} />;
}
