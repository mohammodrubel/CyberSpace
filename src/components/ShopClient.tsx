"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BRANDS, CATEGORIES, type CategoryId } from "@/data/catalog";
import { useLang } from "@/lib/useLang";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  resetFilters, selectFilteredProducts, setCategory, setPriceMax, setPriceMin, setQuery, setSort, setView,
  toggleBrand, type SortKey,
} from "@/store/catalogSlice";
import ProductCard from "./ProductCard";

export default function ShopClient() {
  const { lang, t } = useLang();
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const f = useAppSelector((s) => s.catalog);
  const filtered = useAppSelector(selectFilteredProducts);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [allBrands, setAllBrands] = useState(false);

  useEffect(() => {
    const c = params.get("category");
    if (c && CATEGORIES.some((x) => x.id === c)) dispatch(setCategory(c as CategoryId));
    const q = params.get("q");
    if (q) dispatch(setQuery(q));
  }, [params, dispatch]);

  const hasPrices = f.items.some((p) => p.price !== null);

  const catCounts = useMemo(() => {
    const m = new Map<string, number>();
    f.items.forEach((p) => m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return m;
  }, [f.items]);
  const brandCounts = useMemo(() => {
    const m = new Map<string, number>();
    f.items.forEach((p) => m.set(p.brand, (m.get(p.brand) ?? 0) + 1));
    return m;
  }, [f.items]);

  const brands = BRANDS.filter((b) => brandCounts.has(b));
  const shownBrands = allBrands ? brands : brands.slice(0, 6);
  const num = (v: string) => (v === "" ? null : Math.max(0, Number(v)));

  return (
    <div className="shop">
      <form className="searchbar container" role="search" onSubmit={(e) => e.preventDefault()}>
        <label className="sr" htmlFor="shop-q">{t.common.search}</label>
        <input id="shop-q" type="search" value={f.query} placeholder={t.shop.searchPlaceholder}
          onChange={(e) => dispatch(setQuery(e.target.value))} />
        <button type="submit" className="btn btn--primary">{t.common.search}</button>
      </form>

      <div className="container shop__layout">
        <button type="button" className="btn btn--ghost filters-toggle" aria-expanded={filtersOpen} aria-controls="filters"
          onClick={() => setFiltersOpen((v) => !v)}>
          {t.shop.categories} / {t.shop.brands}
        </button>

        <aside id="filters" className={`filters${filtersOpen ? " is-open" : ""}`}>
          <section className="fgroup">
            <h2 className="fgroup__h">{t.shop.categories}</h2>
            <ul className="flist">
              <li>
                <button type="button" className={`flink${f.category === null ? " is-active" : ""}`} onClick={() => dispatch(setCategory(null))}>
                  <span>{t.common.all}</span><span className="count">{f.items.length}</span>
                </button>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button type="button" className={`flink${f.category === c.id ? " is-active" : ""}`} onClick={() => dispatch(setCategory(c.id))}>
                    <span>{c.name[lang]}</span><span className="count">{catCounts.get(c.id) ?? 0}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="fgroup">
            <h2 className="fgroup__h">{t.shop.brands}</h2>
            <ul className="flist">
              {shownBrands.map((b) => (
                <li key={b}>
                  <label className="check">
                    <input type="checkbox" checked={f.brands.includes(b)} onChange={() => dispatch(toggleBrand(b))} />
                    <span>{b}</span><span className="count">{brandCounts.get(b)}</span>
                  </label>
                </li>
              ))}
            </ul>
            {brands.length > 6 && (
              <button type="button" className="linkbtn" onClick={() => setAllBrands((v) => !v)}>
                {allBrands ? t.shop.showLess : t.shop.showMore}
              </button>
            )}
          </section>

          {hasPrices && (
            <section className="fgroup">
              <h2 className="fgroup__h">{t.shop.priceRange} (USD)</h2>
              <div className="range">
                <div>
                  <label htmlFor="pmin">{t.shop.min}</label>
                  <input id="pmin" type="number" min={0} inputMode="numeric" value={f.priceMin ?? ""} onChange={(e) => dispatch(setPriceMin(num(e.target.value)))} />
                </div>
                <div>
                  <label htmlFor="pmax">{t.shop.max}</label>
                  <input id="pmax" type="number" min={0} inputMode="numeric" value={f.priceMax ?? ""} onChange={(e) => dispatch(setPriceMax(num(e.target.value)))} />
                </div>
              </div>
            </section>
          )}

          <button type="button" className="btn btn--ghost btn--block" onClick={() => dispatch(resetFilters())}>{t.shop.reset}</button>
        </aside>

        <section className="results" aria-live="polite">
          <div className="toolbar">
            <p className="toolbar__count">
              {t.shop.showing} {filtered.length} {t.shop.of} {f.items.length} {t.shop.products}
            </p>
            <div className="toolbar__ctrl">
              <label htmlFor="sort">{t.shop.sortBy}</label>
              <select id="sort" value={f.sort} onChange={(e) => dispatch(setSort(e.target.value as SortKey))}>
                <option value="relevance">{t.shop.sortRelevance}</option>
                <option value="nameAsc">{t.shop.sortNameAsc}</option>
                {hasPrices && <option value="priceAsc">{t.shop.sortPriceAsc}</option>}
                {hasPrices && <option value="priceDesc">{t.shop.sortPriceDesc}</option>}
              </select>
              <div className="seg" role="group">
                <button type="button" className={f.view === "grid" ? "is-active" : ""} aria-pressed={f.view === "grid"} aria-label={t.shop.gridView} onClick={() => dispatch(setView("grid"))}>
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M3 3h5v5H3zM12 3h5v5h-5zM3 12h5v5H3zM12 12h5v5h-5z" fill="currentColor" /></svg>
                </button>
                <button type="button" className={f.view === "list" ? "is-active" : ""} aria-pressed={f.view === "list"} aria-label={t.shop.listView} onClick={() => dispatch(setView("list"))}>
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M3 4h14v3H3zM3 9h14v3H3zM3 14h14v3H3z" fill="currentColor" /></svg>
                </button>
              </div>
            </div>
          </div>

          {f.status === "loading" || f.status === "idle" ? (
            <p className="muted">{t.common.loading}</p>
          ) : filtered.length === 0 ? (
            <div className="empty">
              <p>{t.shop.noResults}</p>
              <button type="button" className="btn btn--primary" onClick={() => dispatch(resetFilters())}>{t.shop.reset}</button>
            </div>
          ) : (
            <div className={`pgrid${f.view === "list" ? " pgrid--list" : ""}`}>
              {filtered.map((p) => <ProductCard key={p.id} product={p} view={f.view} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
