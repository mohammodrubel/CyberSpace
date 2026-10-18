import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NEWS } from "@/data/catalog";
import { LOCALES, getDict, isLocale, type Locale } from "@/lib/i18n";
import { formatDay } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { FadeUp, FadeDown } from "@/components/Motion";

type Params = Promise<{ lang: string; id: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    NEWS.map((n) => ({ lang, id: n.id }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};
  const article = NEWS.find((n) => n.id === id);
  if (!article) return {};
  const L = lang as Locale;
  return {
    ...pageMeta(lang, `/news/${id}`, article.title[L], article.excerpt[L]),
    openGraph: {
      title: article.title[L],
      description: article.excerpt[L],
      images: article.image ? [{ url: article.image, width: 800, height: 450 }] : [],
      type: "article",
    },
  };
}

export default async function NewsDetail({ params }: { params: Params }) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();

  const article = NEWS.find((n) => n.id === id);
  if (!article) notFound();

  const t = getDict(lang);
  const L = lang as Locale;
  const related = NEWS.filter((n) => n.id !== id).slice(0, 3);

  const backLabel = { en: "Back to News", az: "Xəbərlərə qayıt", ru: "К новостям" }[L];
  const relatedLabel = { en: "More Articles", az: "Digər Məqalələr", ru: "Другие статьи" }[L];
  const readMoreLabel = { en: "Read more →", az: "Daha çox oxu →", ru: "Читать далее →" }[L];
  const byLabel = { en: "By", az: "Müəllif:", ru: "Автор:" }[L];

  return (
    <main id="main">
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <div className="container breadcrumb__inner">
          <Link href={`/${lang}`} className="breadcrumb__link">{t.nav.home}</Link>
          <span className="breadcrumb__sep" aria-hidden="true">›</span>
          <Link href={`/${lang}/news`} className="breadcrumb__link">{t.nav.news}</Link>
          <span className="breadcrumb__sep" aria-hidden="true">›</span>
          <span className="breadcrumb__current" aria-current="page">{article.title[L]}</span>
        </div>
      </nav>

      <article className="news-detail">
        {/* Article header */}
        <header className="news-detail__header container">
          <FadeDown>
            <div className="news-detail__meta">
              <span className="news-category-tag">{article.category[L]}</span>
              <time dateTime={article.date} className="news-detail__date">
                {formatDay(article.date, lang)}
              </time>
              {article.author && (
                <span className="news-detail__author">{byLabel} {article.author}</span>
              )}
            </div>
            <h1 className="news-detail__title">{article.title[L]}</h1>
            <p className="news-detail__lead">{article.excerpt[L]}</p>
          </FadeDown>
        </header>

        {/* Featured image */}
        <FadeUp>
          <div className="news-detail__img-wrap container">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title[L]}
                width={1200}
                height={630}
                className="news-detail__img"
                priority
                unoptimized
              />
            ) : (
              <div className="news-detail__img-placeholder" aria-hidden="true" />
            )}
          </div>
        </FadeUp>

        {/* Article body */}
        <div className="news-detail__body container">
          <FadeUp>
            <div className="news-detail__prose">
              {(article.body[L] ?? [article.excerpt[L]]).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </FadeUp>

          {/* Back link */}
          <FadeUp delay={0.1}>
            <div className="news-detail__footer">
              <Link href={`/${lang}/news`} className="btn btn--outline news-detail__back">
                ← {backLabel}
              </Link>
            </div>
          </FadeUp>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="news-related">
          <div className="container">
            <FadeUp>
              <h2 className="news-related__heading">{relatedLabel}</h2>
            </FadeUp>
            <div className="news-full-grid">
              {related.map((n, i) => (
                <FadeUp key={n.id} delay={i * 0.08}>
                  <Link href={`/${lang}/news/${n.id}`} className="news-full-card">
                    <div className="news-full-card__img-wrap">
                      {n.image ? (
                        <Image
                          src={n.image}
                          alt={n.title[L]}
                          width={400}
                          height={220}
                          className="news-full-card__img"
                          unoptimized
                          loading="lazy"
                        />
                      ) : (
                        <div className="news-full-card__img-placeholder" aria-hidden="true" />
                      )}
                    </div>
                    <div className="news-full-card__body">
                      <div className="news-full-card__top">
                        <span className="news-category-tag">{n.category[L]}</span>
                        <time dateTime={n.date} className="news-full-card__date">
                          {formatDay(n.date, lang)}
                        </time>
                      </div>
                      <h3 className="news-full-card__title">{n.title[L]}</h3>
                      <p className="news-full-card__excerpt">{n.excerpt[L]}</p>
                      <span className="sol-card__link">{readMoreLabel}</span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
