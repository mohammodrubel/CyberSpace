import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NEWS, PARTNERS } from "@/data/catalog";
import { formatDay } from "@/lib/format";
import { LOCALES, getDict, isLocale, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

const PAGES = ["about", "solutions", "services", "partners", "news", "careers", "contact"] as const;
type PageKey = (typeof PAGES)[number];

const MIGRATE: Record<Locale, string> = {
  en: "The text of this page will be carried over from the current Cyberspace.az website during content migration.",
  az: "Bu səhifənin mətni məzmun miqrasiyası zamanı mövcud Cyberspace.az saytından köçürüləcək.",
  ru: "Текст этой страницы будет перенесён с действующего сайта Cyberspace.az при миграции контента.",
};

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => PAGES.map((page) => ({ lang, page })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; page: string }> }): Promise<Metadata> {
  const { lang, page } = await params;
  if (!isLocale(lang) || !PAGES.includes(page as PageKey)) return {};
  const t = getDict(lang);
  return pageMeta(lang, `/${page}`, t.nav[page as PageKey], t.home.aboutText);
}

export default async function InfoPage({ params }: { params: Promise<{ lang: string; page: string }> }) {
  const { lang, page } = await params;
  if (!isLocale(lang) || !PAGES.includes(page as PageKey)) notFound();
  const t = getDict(lang);
  const key = page as PageKey;

  return (
    <div className="container section info">
      <h1>{t.nav[key]}</h1>
      {key === "about" && <p className="prose">{t.home.aboutText}</p>}
      {key === "partners" && <ul className="partners">{PARTNERS.map((p) => <li key={p}>{p}</li>)}</ul>}
      {key === "news" && (
        <div className="newsgrid">
          {NEWS.map((n) => (
            <article key={n.id} className="news"><time dateTime={n.date}>{formatDay(n.date, lang)}</time><h2>{n.title[lang]}</h2></article>
          ))}
        </div>
      )}
      {key === "contact" && <p className="prose">Cyberspace.az<br />{t.footer.address}</p>}
      <p className="notice">{MIGRATE[lang]}</p>
    </div>
  );
}
