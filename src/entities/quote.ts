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
}

/** Query filters accepted by GET /quotes. */
export interface QuoteListFilters {
  branchId?: string;
  customerId?: string;
  isActive?: boolean;
  /** Matches folio number or customer name. */
  search?: string;
}
