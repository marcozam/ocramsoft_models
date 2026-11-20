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
     * (`GET /online-store/products/:id`); omitted from the list response, except
     * on a grouper, where it carries the fallback gallery described in
     * `variations` so the card can preview the variations it stands for.
     */
    images?: OnlineStoreProductImage[];
    brand?: string;
    categoryId?: string;
    categoryName?: string;
    /**
     * True when this row is a grouper: an abstract parent that is never sold on
     * its own. The customer picks one of its `variations` to buy.
     */
    isGrouper?: boolean;
    /** How many variations the customer can pick between. Only set on a grouper. */
    variationCount?: number;
    /**
     * True when `price` is the cheapest variation's price rather than this
     * product's own — render it as a "from" price.
     */
    priceFrom?: boolean;
    /**
     * The variations a customer picks between, cheapest-sellable first. Populated
     * on the detail endpoint for a grouper; omitted from the list response and
     * from plain products.
     *
     * A grouper's own images and description stand in until one is picked: a
     * grouper with no images of its own borrows each variation's principal image,
     * and the selected variation's description is appended to the grouper's.
     */
    variations?: OnlineStoreProductVariation[];
}
/**
 * One selectable variation of a grouper (a size, a finish, a lock type). A
 * variation is a real, sellable product: it carries its own price, stock-backed
 * availability, gallery and description.
 */
export interface OnlineStoreProductVariation {
    id: string;
    /** The variation's own name (e.g. "Caja Fuerte X — 40 cm"). */
    name: string;
    /**
     * Rich-text (HTML) description of what makes this variation different. The
     * storefront appends it to the grouper's description rather than replacing it.
     */
    description?: string;
    /** Unit price from the branch price list, in the parent's `currency`. */
    price: number;
    /** Whether this variation can currently be purchased. */
    available: boolean;
    /** Principal image URL for this variation, when it has one. */
    imageUrl?: string;
    /** This variation's gallery, principal first; the storefront swaps to it on selection. */
    images?: OnlineStoreProductImage[];
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
/**
 * A category the online store has something to sell in, with the look the
 * back office gave it. The appearance fields are absent when the category has
 * no custom look; the storefront falls back to its own default.
 */
export interface OnlineStoreCategory {
    id: string;
    name: string;
    /** Material icon ligature name (e.g. `pets`). */
    icon?: string;
    /** Icon colour as `#RRGGBB`. */
    iconColor?: string;
    /** Background colour behind the icon as `#RRGGBB`. */
    backgroundColor?: string;
    /** How many catalog rows (groupers count once) fall in this category. */
    productCount: number;
}
/**
 * How the storefront reads the prices it is given (`GET /online-store/pricing`).
 * The prices on products and variations are already what the shopper pays per
 * unit when `pricesIncludeTax` is true; otherwise tax at `taxRate` is added to
 * the order total at checkout.
 */
export interface OnlineStorePricing {
    /** Whether listed prices already include tax (POS setting `includeTaxInPrices`). */
    pricesIncludeTax: boolean;
    /** Tax rate as a fraction (`0.16` for 16 %). */
    taxRate: number;
    /** How orders are delivered and what that costs; absent = not offered online. */
    fulfillment?: OnlineStoreFulfillmentRules;
}
/**
 * Delivery and pickup rules of the online store. Amounts are in the store's
 * currency and compare with the products total as the shopper pays it (tax
 * included when prices include tax).
 */
export interface OnlineStoreFulfillmentRules {
    delivery: {
        /** Fee per order below `freeFrom`. */
        fee: number;
        /** Products total from which delivery is free; null = never free. */
        freeFrom: number | null;
        /** Where the store delivers, e.g. "Mazatlán". */
        city: string;
        state: string;
        /** Postal code prefixes the store delivers to (e.g. `820`); empty = any. */
        postalCodePrefixes: string[];
        /** Promise shown to the shopper, e.g. "Entrega en Mazatlán en menos de 24 h". */
        promise: string | null;
    };
    /** Absent = pickup is not offered. */
    pickup?: {
        /** Where to pick the order up (the store's branch). */
        name: string;
        address: string;
        /** Fraction off the products total from `discountFrom` (`0.05` = 5 %). */
        discountRate: number;
        /** Products total from which the discount applies; null = never. */
        discountFrom: number | null;
        /** Most the discount takes off; null = no cap. */
        discountCap: number | null;
    };
}
//# sourceMappingURL=online-store.d.ts.map