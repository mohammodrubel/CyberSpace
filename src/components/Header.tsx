"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LOCALES, LOCALE_LABEL, type Locale } from "@/lib/i18n";
import { useLang } from "@/lib/useLang";
import { useAppSelector } from "@/store";
import Logo from "./Logo";

const NAV = [
  ["home", ""], ["about", "/about"], ["products", "/shop"], ["solutions", "/solutions"], ["services", "/services"],
  ["partners", "/partners"], ["news", "/news"], ["careers", "/careers"], ["contact", "/contact"],
] as const;

export default function Header() {
  const { lang, t } = useLang();
  const pathname = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);
  const newCount = useAppSelector((s) => s.inquiry.items.filter((i) => i.status === "new").length);

  const base = `/${lang}`;
  const rest = pathname.replace(/^\/[^/]+/, "") || "";
  const isActive = (href: string) => (href === "" ? rest === "" : rest.startsWith(href));
  const swap = (l: Locale) => `/${l}${rest}`;

  return (
    <header className="header">
      <a className="skip" href="#main">{t.common.skipToContent}</a>
      <div className="container header__bar">
        <Link href={base} className="header__logo" onClick={() => setOpen(false)}><Logo /></Link>

        <nav className={`nav${open ? " nav--open" : ""}`} aria-label="Main">
          {NAV.map(([key, href]) => (
            <Link key={key} href={`${base}${href}`} className={`nav__link${isActive(href) ? " is-active" : ""}`}
              aria-current={isActive(href) ? "page" : undefined} onClick={() => setOpen(false)}>
              {t.nav[key]}
            </Link>
          ))}
          <Link href={`${base}/admin`} className={`nav__link nav__admin${isActive("/admin") ? " is-active" : ""}`} onClick={() => setOpen(false)}>
            {t.nav.admin}{newCount > 0 && <span className="badge" aria-label={`${newCount} new`}>{newCount}</span>}
          </Link>
        </nav>

        <div className="header__tools">
          <Link href={`${base}/shop`} className="iconbtn" aria-label={t.common.search}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m16 16 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </Link>
          <div className="lang" role="group" aria-label={t.common.language}>
            {LOCALES.map((l) => (
              <Link key={l} href={swap(l)} hrefLang={l} className={`lang__btn${l === lang ? " is-active" : ""}`}
                aria-current={l === lang ? "true" : undefined}>{LOCALE_LABEL[l]}</Link>
            ))}
          </div>
          <button type="button" className="iconbtn menubtn" aria-expanded={open} aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d={open ? "M5 5l14 14M19 5 5 19" : "M4 7h16M4 12h16M4 17h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
