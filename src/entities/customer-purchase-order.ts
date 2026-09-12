import { BaseEntity } from '../core/base-entity';

/**
 * A customer purchase order (Orden de Compra) is an inbound demand document:
 * a commitment our CUSTOMER issues to us. It is not a sale — we fulfil it with
 * one or more sale orders, which is what `linkedSaleCount` counts.
 *
 * Rows are synced from whichever channel the customer's procurement system
 * offers (see `CustomerPurchaseOrderSource`); the shape below is normalized so
 * the rest of the system never has to care which one it came from.
 */

/** Channel a purchase order arrived through. Mirrors OrdenCompraCliente.IDOrigen. */
export enum CustomerPurchaseOrderSource {
  /** Coupa Supplier Portal REST API (supplier.coupahost.com). */
  CoupaSupplierPortal = 1,
  /** The buyer's own Coupa instance via the Coupa Core API. */
  CoupaCoreApi = 2,
  /** Inbound cXML PunchOut/OrderRequest document. */
  Cxml = 3,
  /** Spreadsheet export uploaded by hand. */
  CsvImport = 4,
  /** Captured directly in the ERP. */
  Manual = 5,
}

/** Normalized PO status. Mirrors the CatStatus group IDUso = 404. */
export enum CustomerPurchaseOrderStatus {
  /** Received, nothing fulfilled yet. */
  Open = 40401,
  /** Partially fulfilled by linked sales. */
  InProgress = 40402,
  /** Every line has stock ready to ship. */
  Ready = 40403,
  /** Fully delivered / closed at the customer. */
  Delivered = 40404,
  Cancelled = 40405,
  /** buyer_hold / supplier_hold / currency_hold in the source system. */
  OnHold = 40406,
}

/**
 * Supplier-side confirmation state as the source reports it. Coupa calls this
 * `confirmation_status`; other channels may leave it undefined.
 */
export type CustomerPurchaseOrderConfirmation =
  | 'pending_supplier_action'
  | 'confirmed'
  | 'partially_confirmed'
  | 'rejected';

/**
 * Can we ship this line today?
 * - `unmapped`  — no product mapped yet, readiness cannot be assessed
 * - `delivered` — nothing pending
 * - `ready`     — stock covers the full pending quantity
 * - `partial`   — some stock, not enough
 * - `short`     — no stock for the pending quantity
 */
export type FulfillmentReadiness =
  | 'unmapped'
  | 'delivered'
  | 'ready'
  | 'partial'
  | 'short';

/** Eagle-view representation of a purchase order — no line items. */
export interface CustomerPurchaseOrderSummary extends BaseEntity {
  /**
   * Public GUID of the purchase order (OrdenCompraCliente.PublicId).
   * The internal numeric ID is never exposed by the API.
   */
  id?: string;
  /** The customer's own PO number, unique per customer. */
  poNumber: string;
  /** Revision counter from the source system; a re-issued PO arrives higher. */
  version: number;
  sourceId: CustomerPurchaseOrderSource;
  /** Primary key of the record in the source system (e.g. the Coupa order id). */
  externalId?: string;
  /** Raw status string as the source reports it (`issued`, `closed`, ...). */
  externalStatus?: string;
  statusId: CustomerPurchaseOrderStatus;
  statusName?: string;
  confirmationStatus?: CustomerPurchaseOrderConfirmation;
  /** ISO datetime the PO was issued in the source system. */
  issuedAt?: string;
  /** Earliest need-by date across all lines (YYYY-MM-DD). */
  requiredDate?: string;
  /** ISO 4217 code. */
  currency: string;
  subtotal: number;
  tax: number;
  total: number;
  /** ISO datetime of the last successful sync of this record. */
  syncedAt?: string;
  /** Public GUID of the customer (Contacto.PublicId). */
  customerId: string;
  customerName?: string;
  lineCount?: number;
  /**
   * Lines whose part number has no product mapped yet. Non-zero means someone
   * must resolve them before the PO can be planned.
   */
  unmappedLineCount?: number;
  linkedSaleCount?: number;
}

export interface CustomerPurchaseOrderLine {
  lineNumber: number;
  externalLineId?: string;
  description: string;
  /** Our part number as the CUSTOMER records it (Coupa `source-part-num`). */
  customerPartNumber?: string;
  /** Undefined = the line is not mapped to one of our products yet. */
  productId?: number;
  productName?: string;
  barcode?: string;
  quantity: number;
  unitOfMeasure?: string;
  unitPrice: number;
  lineTotal: number;
  /** Per-line need-by date (YYYY-MM-DD) — what drives production planning. */
  requiredDate?: string;
  externalStatus?: string;
  /** Quantity the customer reports as received on their side. */
  quantityReceivedByCustomer?: number;
}

/** Full purchase order: header plus its lines. */
export interface CustomerPurchaseOrder extends CustomerPurchaseOrderSummary {
  /** ISO datetime the supplier acknowledged the PO in the source system. */
  acknowledgedAt?: string;
  shipToName?: string;
  shipToAddress?: string;
  /** ISO datetime of `updated-at` in the source; drives the sync watermark. */
  remoteUpdatedAt?: string;
  lines: CustomerPurchaseOrderLine[];
}

/**
 * One row of the fulfillment board: a PO line with the stock answer attached.
 *
 * Quantities allocate to the lowest line number first when a product appears on
 * several lines of the same PO. Stock is NOT reserved across purchase orders —
 * two open POs needing the same scarce product each report it available.
 */
export interface CustomerPurchaseOrderFulfillmentLine {
  /** Public GUID of the purchase order this line belongs to. */
  poId: string;
  poNumber: string;
  poStatusId: CustomerPurchaseOrderStatus;
  customerId?: string;
  customerName?: string;
  lineNumber: number;
  description: string;
  customerPartNumber?: string;
  productId?: number;
  productName?: string;
  barcode?: string;
  quantityOrdered: number;
  /** Already delivered through sales linked to this PO. */
  quantityFulfilled: number;
  quantityPending: number;
  /** On-hand stock left for this line after earlier lines claimed theirs. */
  stockAvailable: number;
  unitOfMeasure?: string;
  unitPrice: number;
  lineTotal: number;
  requiredDate?: string;
  /** Negative once the required date has passed. */
  daysUntilDue?: number;
  isOverdue: boolean;
  readiness: FulfillmentReadiness;
}

/** Query filters for the fulfillment board. */
export interface CustomerPurchaseOrderFulfillmentQuery {
  /** Public GUID of a single PO; omit for the board across all open POs. */
  poId?: string;
  customerId?: string;
  /** Scope stock to what this branch can actually ship. */
  branchId?: number;
  /** Default true — hides delivered and cancelled purchase orders. */
  pendingOnly?: boolean;
  /** Only lines due within N days. */
  horizonDays?: number;
}

/** Outcome of one integration sync pass. */
export interface IntegrationSyncResult {
  /** Feed key, e.g. `coupa_csp_orders`. */
  source: string;
  status: 'success' | 'error';
  recordsRead: number;
  recordsCreated: number;
  recordsUpdated: number;
  /** Records the source returned that were already up to date. */
  recordsSkipped: number;
  /** New watermark after a successful pass; unchanged on error. */
  watermark?: string;
  startedAt: string;
  finishedAt?: string;
  message?: string;
}

/** Stored state of one integration feed. */
export interface IntegrationSyncState {
  source: string;
  /** Highest source `updated-at` successfully processed (ISO datetime). */
  watermark?: string;
  lastRunAt?: string;
  lastStatus?: 'running' | 'success' | 'error';
  lastRecordCount?: number;
  lastMessage?: string;
}
