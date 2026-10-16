import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPublicProducts, type VisibilitySettings } from "@/lib/mock1c";
import type { PublicProduct } from "@/data/catalog";

/**
 * Pulls the current product list from "1C" (mock) using the visibility
 * settings an administrator has chosen. Re-run after changing a setting.
 */
export const syncProducts = createAsyncThunk<
  { items: PublicProduct[]; at: string },
  void,
  { state: { settings: VisibilitySettings } }
>("catalog/sync", async (_, { getState }) => {
  const { showPrices, showStock } = getState().settings;
  const items = await fetchPublicProducts({ showPrices, showStock });
  return { items, at: new Date().toISOString() };
});
