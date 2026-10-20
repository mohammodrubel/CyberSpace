import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { BACKEND_URL } from "@/lib/server-auth";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface ApiProduct {
  id: string;
  sku: string;
  brand?: string | null;
  translations: { lang: string; name: string; description?: string | null }[];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  try {
    const res = await fetch(`${BACKEND_URL}/products/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!res.ok) return {};
    const json = await res.json();
    const p: ApiProduct = json.data ?? json;
    const trans = p.translations?.find((t) => t.lang === lang.toUpperCase()) ?? p.translations?.[0];
    const name = trans?.name ?? p.sku;
    const desc = trans?.description ?? "";
    return pageMeta(lang, `/shop/${slug}`, `${name}${p.brand ? ` (${p.brand})` : ""}`, desc);
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  return <ProductDetail slug={slug} />;
}

