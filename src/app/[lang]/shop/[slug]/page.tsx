import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { PRODUCTS_1C, describeProduct } from "@/data/catalog";
import { LOCALES, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => PRODUCTS_1C.map((p) => ({ lang, slug: p.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = PRODUCTS_1C.find((x) => x.id === slug);
  if (!isLocale(lang) || !p) return {};
  // Only name, brand and description go into metadata. Price and stock stay out so hidden values never leak.
  return pageMeta(lang, `/shop/${slug}`, `${p.name} (${p.brand})`, describeProduct(p, lang));
}

export default async function ProductPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !PRODUCTS_1C.some((p) => p.id === slug)) notFound();
  return <ProductDetail slug={slug} />;
}
