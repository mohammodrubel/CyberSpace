"use client";

import { useParams } from "next/navigation";
import { DEFAULT_LOCALE, getDict, isLocale } from "./i18n";

export function useLang() {
  const p = useParams<{ lang?: string }>();
  const lang = p?.lang && isLocale(p.lang) ? p.lang : DEFAULT_LOCALE;
  return { lang, t: getDict(lang) };
}
