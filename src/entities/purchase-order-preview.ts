// src/entities/purchase-order-preview.ts
//
// Shared contract for GET /purchasing/order-preview: a suggested purchase
// order per supplier, computed from a branch's sales history, current stock,
// stock already on order and the latest purchase cost of each product.
//
// Formula, per product (d = daily demand, F = forecast per period):
//   F  = weighted average of the sales per period, most recent weighs most
//        (weights N..1 over the N periods)
//   d  = F / periodDays
//   SS = safetyFactor · σ(sales per period) · √((coverageDays + leadTimeDays) / periodDays)
//   T  = ceil(d · (coverageDays + leadTimeDays) + SS), at least minStockForActive
//        when the product sold in the history window, clamped to the
//        branch's StockMinimo / StockMaximo
//   Q  = max(0, T − (onHand + onOrder))

/** Tunable inputs of the formula. Every field is optional on the request. */
export interface PurchaseOrderPreviewParameters {
  /** Days of stock the order must cover after it arrives. Default 30. */
  coverageDays: number;
  /** Days between ordering and receiving. Default 7. */
  leadTimeDays: number;
  /** Length of each sales period, in days. Default 30. */
  periodDays: number;
  /** Number of periods of sales history (6 × 30 days = 180). Default 6. */
  historyPeriods: number;
  /** z of the safety stock (1.28 ≈ 90% service level; 0 disables it). Default 1.28. */
  safetyFactor: number;
  /** Minimum stock of any product sold in the history window. Default 1. */
  minStockForActive: number;
  /** Expenses older than this many days never count as stock on order. Default 60. */
  pendingOrderDays: number;
}

/** Query accepted by GET /purchasing/order-preview. */
export interface PurchaseOrderPreviewQuery
  extends Partial<PurchaseOrderPreviewParameters> {
  branchId: number;
  categoryId?: number;
  /** Only this supplier's order (supplier public id). */
  supplierId?: string;
  /** Cut-off date (YYYY-MM-DD); defaults to today in the business timezone. */
  asOfDate?: string;
}

export type PurchaseSuggestionFlag =
  /** Never bought on an expense: no supplier and no cost to propose. */
  | 'no-supplier'
  /** Stock on hand but no sales in the history window: do not reorder. */
  | 'dead-stock'
  /** First sale less than one period ago: the forecast is extrapolated. */
  | 'short-history'
  /** Stock below zero: sold without stock registered, worth a count. */
  | 'negative-stock'
  /** The proposed supplier is marked inactive. */
  | 'inactive-supplier';

/** Latest purchase of a product from one supplier. */
export interface PurchaseSupplierCost {
  /** Supplier public id; null for a store not registered as supplier. */
  supplierId: string | null;
  supplierName: string;
  supplierActive: boolean;
  /** Net of discount, before taxes, in MXN. */
  unitCost: number;
  /** IVA rate (0.16); null = exento. */
  taxRate: number | null;
  lastPurchaseDate: string;
  purchaseCount: number;
}

export interface PurchaseSuggestionLine {
  productId: number;
  productName: string;
  barcode: string;
  categoryId: number;
  categoryName: string;

  /** Units sold per period; index 0 is the most recent period. */
  salesByPeriod: number[];
  soldInHistory: number;
  firstSaleDate: string | null;
  lastSaleDate: string | null;

  /** F: forecast units for the next period. */
  forecast: number;
  /** d: forecast units per day. */
  dailyDemand: number;
  /** σ of salesByPeriod. */
  standardDeviation: number;
  safetyStock: number;
  /** T: stock the branch should hold after this order. */
  targetStock: number;

  onHand: number;
  onOrder: number;
  /** onHand + onOrder. */
  inventoryPosition: number;
  minStock: number | null;
  maxStock: number | null;
  /** Days onHand lasts at dailyDemand; null when there is no demand. */
  daysOfStock: number | null;

  /** Q: units to order. */
  suggestedQuantity: number;
  /** Proposed supplier: the most recent purchase. */
  supplier: PurchaseSupplierCost | null;
  /** Every supplier the product was bought from, cheapest first. */
  supplierOptions: PurchaseSupplierCost[];
  subtotal: number;
  tax: number;
  total: number;

  flags: PurchaseSuggestionFlag[];
}

export interface PurchaseOrderPreviewTotals {
  lineCount: number;
  units: number;
  subtotal: number;
  tax: number;
  total: number;
}

/** Suggested order for one supplier. */
export interface PurchaseOrderPreviewSupplierOrder
  extends PurchaseOrderPreviewTotals {
  supplierId: string | null;
  supplierName: string;
  supplierActive: boolean;
  lines: PurchaseSuggestionLine[];
}

export interface PurchaseOrderPreview {
  branchId: number;
  asOfDate: string;
  parameters: PurchaseOrderPreviewParameters;
  /** false when the branch has no active stock location (onHand read as 0). */
  hasStockLocation: boolean;
  /** Suppliers with something to order, largest total first. */
  orders: PurchaseOrderPreviewSupplierOrder[];
  /** Products to order that were never bought: no supplier, no cost. */
  withoutSupplier: PurchaseSuggestionLine[];
  /** Stock on hand with no sales in the history window. */
  deadStock: PurchaseSuggestionLine[];
  totals: PurchaseOrderPreviewTotals;
}
