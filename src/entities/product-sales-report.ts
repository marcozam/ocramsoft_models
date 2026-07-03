/** Inclusive calendar-day range covered by a report, serialized as YYYY-MM-DD. */
export interface ReportDateRange {
  from: string;
  to: string;
}

/** Sales aggregate for a single product within one reporting period. */
export interface ProductSalesAggregate {
  productId: number;
  productName: string;
  sku?: string;
  categoryId: number | null;
  categoryName?: string;
  brandId: number | null;
  brandName?: string;
  quantitySold: number;
  revenue: number;
  /** Number of distinct orders the product appeared in. */
  ordersCount: number;
}

/** How a product performed in a comparison period relative to the current one. */
export interface ProductSalesComparison {
  quantitySold: number;
  revenue: number;
  /** Percent change vs. the comparison period; null when it had no sales. */
  quantityChangePct: number | null;
  /** Percent change vs. the comparison period; null when it had no revenue. */
  revenueChangePct: number | null;
}

export interface BestSellingProduct extends ProductSalesAggregate {
  previousMonth: ProductSalesComparison;
  previousYear: ProductSalesComparison;
}

export interface BestSellingProductsReport {
  period: ReportDateRange;
  previousMonthPeriod: ReportDateRange;
  previousYearPeriod: ReportDateRange;
  /** Totals across ALL products sold in the current period, not just the top N. */
  totalQuantity: number;
  totalRevenue: number;
  products: BestSellingProduct[];
}
