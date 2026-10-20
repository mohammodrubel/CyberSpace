import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export default async function AdminRedirect({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  redirect(`/${lang}/dashboard`);
}
