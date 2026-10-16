import { PRODUCTS_1C, type PublicProduct } from "@/data/catalog";

export type VisibilitySettings = { showPrices: boolean; showStock: boolean };

/**
 * Stand-in for the secure JSON REST API that the 1C team will provide.
 * 1C stays the source of truth. Values an administrator has hidden are removed
 * here, before the data ever reaches the public client, so they cannot be read
 * from the network response or the page source.
 *
 * Replace the body with a real fetch() to the agreed endpoint when available.
 */
export async function fetchPublicProducts(settings: VisibilitySettings): Promise<PublicProduct[]> {
  await new Promise((r) => setTimeout(r, 250));
  return PRODUCTS_1C.map((p) => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    brand: p.brand,
    category: p.category,
    specs: p.specs,
    price: settings.showPrices ? p.price : null,
    currency: settings.showPrices ? p.currency : null,
    stock: settings.showStock ? p.stock : null,
  }));
}
