/**
 * A product as exposed to an online store: a clean, channel-agnostic shape
 * (not tied to any marketplace format). Pricing and availability are already
 * resolved for the configured online-store branch.
 *
 * Shared contract between the gateway's online-store module (which builds it)
 * and storefront frontends (which consume it).
 */
/** A single storefront-facing product image. */
export interface OnlineStoreProductImage {
  /** Public image URL. */
  url: string;
  /** True for the principal image (listed first in `images`). */
  isPrincipal?: boolean;
}

export interface OnlineStoreProduct {
  id: string;
  name: string;
  /** Rich-text (HTML) description. Populated on the detail endpoint. */
  description?: string;
  /** Unit price from the branch price list, in `currency`. */
  price: number;
  /** ISO 4217 currency (e.g. `MXN`). */
  currency: string;
  /**
   * Whether the product can currently be purchased. Deliberately the only
   * stock signal exposed to the storefront — the on-hand quantity is an
   * internal detail and is never surfaced.
   */
  available: boolean;
  /** Principal image URL (present in both list and detail responses). */
  imageUrl?: string;
  /**
   * Full image gallery, principal first. Populated on the detail endpoint
   * (`GET /online-store/products/:id`); omitted from the list response.
   */
  images?: OnlineStoreProductImage[];
  brand?: string;
  categoryId?: string;
  categoryName?: string;
}

/** One page of online-store products plus how many were skipped. */
export interface OnlineStoreProductPage {
  items: OnlineStoreProduct[];
  /** Number of products returned in this page. */
  total: number;
  /** Products excluded from this page (missing a branch price). */
  skipped: number;
  nextPageToken?: string | null;
}
