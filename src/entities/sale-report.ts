// src/entities/sale-report.ts
//
// Shared contract for the sale reporting endpoints exposed by the gateway
// (GET /pos/sale/report/summary, GET /pos/sale/report/products-sold) and
// consumed by the lock-security-portal reporting module.

import { SaleOrderSummary } from './sale-order';
import type { PurchaseSupplierCost } from './purchase-order-preview';

/** Income aggregated by payment method for a reporting period. */
export interface SaleSummaryIncomeByPaymentMethod {
  paymentMethodId: number;
  description: string;
  amount: number;
}

/**
 * Monthly sales summary for a branch: headline totals, income broken down by
 * payment method, and the list of sales that make up the period.
 *
 * `salesList` uses the shared {@link SaleOrderSummary} shape — the same shape
 * returned by the by-session/by-customer sale listings — so the frontend and
 * gateway reuse a single mapper for every sale-summary row.
 */
export interface SaleSummaryReport {
  totalSales: number;
  totalPaid: number;
  salesCount: number;
  incomeByPaymentMethod: SaleSummaryIncomeByPaymentMethod[];
  salesList: SaleOrderSummary[];
}

/**
 * One row of the products-sold report: a product's aggregated sales for a
 * branch over the requested date range, plus its current stock in that
 * branch's active stock location.
 */
export interface ProductSoldByBranchReportItem {
  branchId: number;
  branchName: string;
  productId: number;
  productName: string;
  barcode: string;
  categoryId: number;
  categoryName: string;
  quantitySold: number;
  /** Amount sold, after discounts and before taxes. */
  totalAmount: number;
  /** totalAmount / quantitySold: the price per unit actually charged (pre-tax), rounded to cents. */
  averagePrice: number;
  /** 0 when the product has no inventory record in the branch's location. */
  currentStock: number;
  /** false = service category (no inventory) — render stock as N/A, not 0. */
  managesStock: boolean;
  /**
   * Cost of one unit: the product's latest purchase (non-cancelled expense line)
   * on or before the range end, net of discount, before taxes, in MXN.
   * null when the product was never bought on an expense.
   */
  unitCost: number | null;
  /** unitCost × quantitySold, rounded to cents; null without a cost. */
  totalCost: number | null;
  /** Date of the purchase the cost comes from; null without a cost. */
  lastPurchaseDate: string | null;
  /**
   * Supplier of that same purchase (supplier public id), so the products can be
   * grouped by whom to reorder them from. null without a cost, or when the
   * purchase was a ticket from a store not registered as supplier.
   */
  supplierId: string | null;
  /** Name on that purchase; null without a cost. */
  supplierName: string | null;
  /**
   * Every supplier the product was bought from up to the range end, each with
   * its latest price, cheapest first; empty when never bought.
   */
  supplierOptions: PurchaseSupplierCost[];
}

/** Query filters accepted by GET /pos/sale/report/products-sold. */
export interface ProductsSoldReportFilters {
  /** Inclusive range start (YYYY-MM-DD or ISO date). Required. */
  startDate: string;
  /** Inclusive range end (YYYY-MM-DD or ISO date). Required. */
  endDate: string;
  /** Omit for all branches. */
  branchId?: number;
  /** Omit for all product categories. */
  categoryId?: number;
  /** true = only products whose category manages inventory (stock-managed). */
  inStockOnly?: boolean;
}
