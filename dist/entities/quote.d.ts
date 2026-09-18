import { BaseEntity } from '../core/base-entity';
/**
 * A quote (cotización) is a priced, printable offer made to a customer.
 * It is not a sale: no stock movement, no payments, no cash session.
 */
/** Eagle-view representation of a quote — no line items. */
export interface QuoteSummary extends BaseEntity {
    /**
     * Public GUID of the quote (Cotizacion.PublicId).
     * The internal numeric quote ID is never exposed by the API; every quote
     * endpoint takes and returns this GUID.
     */
    id?: string;
    /** Per-branch consecutive number shown to the user (folio). */
    folioNumber: number;
    dateTime: string;
    subtotal: number;
    tax: number;
    total: number;
    /** Offer validity window in days. */
    validityDays: number;
    /** Last day the offer stands (YYYY-MM-DD) = quote date + validityDays. */
    validUntil?: string;
    /** Free-text NOTA block printed under the item table. */
    notes?: string;
    /**
     * Per-quote overrides for the printed copy. A generated quote is editable:
     * the user rewords it for the customer in front of them. Absent means "not
     * overridden" — the printed quote falls back to the deployment's brand copy.
     */
    introLine?: string;
    closingLine?: string;
    /**
     * Person the offer is addressed to, printed under the customer name. Not the
     * registered contact: it is whoever asked for this particular quote.
     */
    attention?: string;
    /** false = soft-deleted; the quote stays reprintable but is hidden by default. */
    isActive: boolean;
    branchId: number;
    branchName?: string;
    /** Public GUID of the customer (Contacto.PublicId). Always set — a quote names its customer. */
    customerId: string;
    customerName?: string;
    customerPhone?: string;
    createdById: number;
    createdByName?: string;
    /** Number of line items. Present on list responses only. */
    itemCount?: number;
}
export interface QuoteItem {
    productId: number;
    sku?: string;
    /** Snapshot of the product name at quote time. */
    description: string;
    /**
     * Snapshot of the product's long description at quote time. Rendered as the
     * CARACTERÍSTICAS block at the bottom of the printed quote.
     */
    detailedDescription?: string;
    /**
     * The grouper this product is a variation of, snapshotted at quote time.
     *
     * A quote often carries several variations of one grouper. Their shared text
     * belongs to the family, so the printed CARACTERÍSTICAS shows
     * `parentDescription` once and then only what each line's own
     * `detailedDescription` adds. Absent on standalone products.
     */
    parentProductId?: number;
    parentName?: string;
    parentDescription?: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    /** Display order on the printed quote (0-based). */
    displayOrder?: number;
}
/**
 * Full quote.
 * Fetched without details only the QuoteSummary fields are populated;
 * fetched with details the items array is included.
 */
export interface Quote extends QuoteSummary {
    items?: QuoteItem[];
}
/** Line item as sent by the FE when creating a quote. */
export interface CreateQuoteItem {
    productId: number;
    /** Name to print. Omit to snapshot the product's current name. */
    description?: string;
    /** CARACTERÍSTICAS text to print. Omit to snapshot the product's long description. */
    detailedDescription?: string;
    /**
     * The grouper's name and long description, printed once for a family of
     * variations. Omit on standalone products, or to snapshot what the product
     * record currently says.
     */
    parentName?: string;
    parentDescription?: string;
    quantity: number;
    /** The offered price — may differ from the price list (the user can override it). */
    unitPrice: number;
    displayOrder?: number;
}
/** HTTP request body sent by the FE and received by the BE when creating a quote. */
export interface CreateQuoteRequest {
    /** Public GUID of the customer (Contacto.PublicId). Required. */
    customerId: string;
    branchId: string;
    items: CreateQuoteItem[];
    /** Offer validity window in days. Defaults to 15 when omitted. */
    validityDays?: number;
    /** Free-text NOTA block, max 1000 chars. */
    notes?: string;
    /** Person the offer is addressed to. */
    attention?: string;
}
/** Query filters accepted by GET /quotes. */
export interface QuoteListFilters {
    branchId?: string;
    customerId?: string;
    isActive?: boolean;
    /** Matches folio number or customer name. */
    search?: string;
}
/**
 * Edits to a stored quote's prose.
 *
 * Only copy is editable. Quantities, prices and totals are deliberately absent
 * so the printed document can never drift from the amounts the quote was
 * stored with. Every field is optional; a blank or omitted value clears the
 * override and falls back to the deployment's brand copy.
 */
export interface UpdateQuoteTextRequest {
    introLine?: string;
    notes?: string;
    closingLine?: string;
    attention?: string;
    /** Per-line CARACTERÍSTICAS text, keyed by product. */
    items?: Array<{
        productId: number;
        detailedDescription?: string;
        /**
         * The family text printed above this line's own. Shared by every variation
         * of one grouper, so an edit to it is sent for each of those lines. A key
         * left out leaves the stored text alone; an empty string clears it.
         */
        parentDescription?: string;
    }>;
}
//# sourceMappingURL=quote.d.ts.map