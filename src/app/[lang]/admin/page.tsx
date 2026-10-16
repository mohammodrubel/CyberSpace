import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminClient from "@/components/AdminClient";
import { getDict, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDict(lang).admin.title, robots: { index: false, follow: false } };
}

export default async function AdminPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <AdminClient />;
}
