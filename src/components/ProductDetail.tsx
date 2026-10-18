"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, describeProduct } from "@/data/catalog";
import { useLang } from "@/lib/useLang";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectProductBySlug } from "@/store/catalogSlice";
import { openInquiry } from "@/store/inquirySlice";
import ProductCard, { PriceText, StockBadge } from "./ProductCard";
import ProductImage from "./ProductImage";
import { FadeLeft, FadeRight, FadeUp } from "./Motion";

type Tab = "description" | "specifications" | "related";

export default function ProductDetail({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProductBySlug(slug));
  const status = useAppSelector((s) => s.catalog.status);
  const items = useAppSelector((s) => s.catalog.items);
  const [tab, setTab] = useState<Tab>("description");

  if (!product) {
    return (
      <div className="container section">
        <p className="muted">{status === "ready" ? t.product.notFound : t.common.loading}</p>
        <Link href={`/${lang}/shop`} className="btn btn--ghost">{t.product.back}</Link>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === product.category)!;
  const related = items.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const tabs: Tab[] = ["description", "specifications", "related"];

  return (
    <div className="container section">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href={`/${lang}`}>{t.nav.home}</Link><span>/</span>
        <Link href={`/${lang}/shop`}>{t.nav.shop}</Link><span>/</span>
        <Link href={`/${lang}/shop?category=${cat.id}`}>{cat.name[lang]}</Link>
      </nav>

      <div className="detail">
        <FadeRight className="detail__media">
          <ProductImage category={product.category} label={product.name} />
        </FadeRight>
        <FadeLeft delay={0.06} className="detail__info">
          <span className="pill">{product.brand}</span>
          <h1 className="detail__title">{product.name}</h1>
          <dl className="detail__ids">
            <div><dt>{t.common.partNo}</dt><dd>{product.sku}</dd></div>
            <div><dt>{t.product.sku}</dt><dd>{product.id}</dd></div>
          </dl>
          <div className="detail__row">
            <StockBadge stock={product.stock} />
            {product.stock !== null && product.stock > 0 && <span className="muted">{product.stock} {t.product.pcs}</span>}
          </div>
          <div className="detail__price">
            {product.price !== null ? <PriceText product={product} /> : null}
          </div>
          <button type="button" className="btn btn--primary btn--lg" onClick={() => dispatch(openInquiry(product.id))}>
            {t.common.contactMe}
          </button>
        </FadeLeft>
      </div>

      <FadeUp>
        <div className="tabs" role="tablist">
          {tabs.map((k) => (
            <button key={k} role="tab" type="button" id={`tab-${k}`} aria-selected={tab === k} aria-controls={`panel-${k}`}
              className={tab === k ? "is-active" : ""} onClick={() => setTab(k)}>
              {t.product[k]}
            </button>
          ))}
        </div>
        <div className="tabpanel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          {tab === "description" && <p className="prose">{describeProduct(product, lang)}</p>}
          {tab === "specifications" && (
            <div className="tablewrap">
              <table className="spec">
                <tbody>{product.specs.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
              </table>
            </div>
          )}
          {tab === "related" && (
            related.length
              ? <div className="pgrid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
              : <p className="muted">—</p>
          )}
        </div>
      </FadeUp>
    </div>
  );
}
