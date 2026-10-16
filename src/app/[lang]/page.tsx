import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { CATEGORIES, NEWS, PARTNERS, PRODUCTS_1C } from "@/data/catalog";
import { formatDay } from "@/lib/format";
import { getDict, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return pageMeta(lang, "", `Cyberspace — ${t.home.heroTitle}`, t.home.heroText);
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const h = t.home;
  const features = [[h.f1t, h.f1d], [h.f2t, h.f2d], [h.f3t, h.f3d], [h.f4t, h.f4d]];
  const stats = [["15+", h.statYears], ["100+", h.statBrands], ["1000+", h.statCustomers], ["50+", h.statTeam]];

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">{h.eyebrow}</p>
            <h1>{h.heroTitle}</h1>
            <p className="hero__text">{h.heroText}</p>
            <div className="hero__cta">
              <Link href={`/${lang}/shop`} className="btn btn--primary btn--lg">{h.exploreProducts}</Link>
              <Link href={`/${lang}/solutions`} className="btn btn--outline btn--lg">{h.ourSolutions}</Link>
            </div>
          </div>
          <svg className="hero__art" viewBox="0 0 360 300" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(${28 + i * 82} 20)`}>
                <rect width="68" height="260" rx="3" fill="#0e2a5c" stroke="#2f6bff" strokeOpacity=".5" />
                {Array.from({ length: 9 }).map((_, r) => (
                  <g key={r}>
                    <rect x="6" y={10 + r * 27} width="56" height="20" fill="#0a1f47" stroke="#2f6bff" strokeOpacity=".35" />
                    <rect x="10" y={16 + r * 27} width="26" height="3" fill="#6fa0ff" opacity=".7" />
                    <circle cx="54" cy={20 + r * 27} r="2.4" fill={(r + i) % 3 === 0 ? "#4ade80" : "#2f6bff"} />
                  </g>
                ))}
              </g>
            ))}
          </svg>
        </div>
      </section>

      <section className="container features">
        {features.map(([a, b]) => (
          <div key={a} className="feature"><strong>{a}</strong><span>{b}</span></div>
        ))}
      </section>

      <section className="container section">
        <div className="section__head">
          <h2>{h.categoriesTitle}</h2>
          <Link href={`/${lang}/shop`} className="more">{t.common.viewAll} →</Link>
        </div>
        <div className="catgrid">
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={`/${lang}/shop?category=${c.id}`} className="catcard">
              <ProductImage category={c.id} label="" />
              <span>{c.name[lang]} <em>{PRODUCTS_1C.filter((p) => p.category === c.id).length}</em></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="container band__inner">
          <div>
            <h2>{h.aboutTitle}</h2>
            <p>{h.aboutText}</p>
            <Link href={`/${lang}/about`} className="btn btn--primary">{h.aboutBtn}</Link>
          </div>
          <dl className="stats">
            {stats.map(([n, l]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="container section">
        <div className="section__head">
          <h2>{h.partnersTitle}</h2>
          <Link href={`/${lang}/partners`} className="more">{t.common.viewAll} →</Link>
        </div>
        <ul className="partners">
          {PARTNERS.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </section>

      <section className="container section">
        <div className="section__head">
          <h2>{h.newsTitle}</h2>
          <Link href={`/${lang}/news`} className="more">{t.common.viewAll} →</Link>
        </div>
        <div className="newsgrid">
          {NEWS.map((n) => (
            <article key={n.id} className="news">
              <time dateTime={n.date}>{formatDay(n.date, lang)}</time>
              <h3>{n.title[lang]}</h3>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
