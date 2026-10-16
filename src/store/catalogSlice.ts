import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { CategoryId, PublicProduct } from "@/data/catalog";
import { syncProducts } from "./thunks";

export type SortKey = "relevance" | "nameAsc" | "priceAsc" | "priceDesc";

type CatalogState = {
  items: PublicProduct[];
  status: "idle" | "loading" | "ready" | "error";
  query: string;
  category: CategoryId | null;
  brands: string[];
  priceMin: number | null;
  priceMax: number | null;
  sort: SortKey;
  view: "grid" | "list";
};

const initialState: CatalogState = {
  items: [], status: "idle", query: "", category: null, brands: [],
  priceMin: null, priceMax: null, sort: "relevance", view: "grid",
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setQuery(s, a: { payload: string }) { s.query = a.payload; },
    setCategory(s, a: { payload: CategoryId | null }) { s.category = a.payload; },
    toggleBrand(s, a: { payload: string }) {
      s.brands = s.brands.includes(a.payload) ? s.brands.filter((b) => b !== a.payload) : [...s.brands, a.payload];
    },
    setPriceMin(s, a: { payload: number | null }) { s.priceMin = a.payload; },
    setPriceMax(s, a: { payload: number | null }) { s.priceMax = a.payload; },
    setSort(s, a: { payload: SortKey }) { s.sort = a.payload; },
    setView(s, a: { payload: "grid" | "list" }) { s.view = a.payload; },
    resetFilters(s) {
      s.query = ""; s.category = null; s.brands = []; s.priceMin = null; s.priceMax = null; s.sort = "relevance";
    },
  },
  extraReducers: (b) => {
    b.addCase(syncProducts.pending, (s) => { if (s.items.length === 0) s.status = "loading"; });
    b.addCase(syncProducts.fulfilled, (s, a) => { s.items = a.payload.items; s.status = "ready"; });
    b.addCase(syncProducts.rejected, (s) => { s.status = "error"; });
  },
});

export const { setQuery, setCategory, toggleBrand, setPriceMin, setPriceMax, setSort, setView, resetFilters } = catalogSlice.actions;
export default catalogSlice.reducer;

type S = { catalog: CatalogState };
const selItems = (s: S) => s.catalog.items;
const selQuery = (s: S) => s.catalog.query;
const selCategory = (s: S) => s.catalog.category;
const selBrands = (s: S) => s.catalog.brands;
const selMin = (s: S) => s.catalog.priceMin;
const selMax = (s: S) => s.catalog.priceMax;
const selSort = (s: S) => s.catalog.sort;

export const selectFilteredProducts = createSelector(
  [selItems, selQuery, selCategory, selBrands, selMin, selMax, selSort],
  (items, query, category, brands, min, max, sort) => {
    const q = query.trim().toLowerCase();
    const out = items.filter((p) => {
      if (category && p.category !== category) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (q && !`${p.name} ${p.sku} ${p.brand}`.toLowerCase().includes(q)) return false;
      if (p.price !== null) {
        if (min !== null && p.price < min) return false;
        if (max !== null && p.price > max) return false;
      }
      return true;
    });
    const byName = (a: PublicProduct, b: PublicProduct) => a.name.localeCompare(b.name);
    if (sort === "nameAsc") out.sort(byName);
    if (sort === "priceAsc") out.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "priceDesc") out.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    return out;
  },
);

export const selectProductBySlug = (slug: string) => (s: S) => s.catalog.items.find((p) => p.id === slug);
