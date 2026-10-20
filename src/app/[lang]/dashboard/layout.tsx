import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/server-auth";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const session = await getServerSession();
  if (!session) redirect(`/${lang}/login`);
  return <>{children}</>;
}
