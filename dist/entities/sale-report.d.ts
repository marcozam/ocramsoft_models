import { SaleOrderSummary } from './sale-order';
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
    totalAmount: number;
    /** 0 when the product has no inventory record in the branch's location. */
    currentStock: number;
    /** false = service category (no inventory) — render stock as N/A, not 0. */
    managesStock: boolean;
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
//# sourceMappingURL=sale-report.d.ts.map