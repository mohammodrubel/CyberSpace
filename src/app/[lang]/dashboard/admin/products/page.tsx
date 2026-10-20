import { getDict, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return <ProductsClient t={t} />;
}
