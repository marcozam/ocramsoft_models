/**
 * A product as exposed to an online store: a clean, channel-agnostic shape
 * (not tied to any marketplace format). Pricing and availability are already
 * resolved for the configured online-store branch.
 *
 * Shared contract between the gateway's online-store module (which builds it)
 * and storefront frontends (which consume it).
 */
export interface OnlineStoreProduct {
    id: string;
    sku?: string;
    name: string;
    description?: string;
    /** Unit price from the branch price list, in `currency`. */
    price: number;
    /** ISO 4217 currency (e.g. `MXN`). */
    currency: string;
    /** Whether the product can currently be purchased. */
    available: boolean;
    /** On-hand quantity when the product is inventory-tracked at the branch. */
    quantity?: number;
    imageUrl?: string;
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
//# sourceMappingURL=online-store.d.ts.map