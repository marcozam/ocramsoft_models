// src/entities/sale-report.ts
//
// Shared contract for the sale reporting endpoints exposed by the gateway
// (GET /pos/sale/report/summary) and consumed by the lock-security-portal
// reporting module. Mirrors the recordsets produced by the SALES_GetOrders
// stored procedure (V0=1).

/** Income aggregated by payment method for a reporting period. */
export interface SaleSummaryIncomeByPaymentMethod {
  paymentMethodId: number;
  description: string;
  amount: number;
}

/** A single sale row included in a sales summary report. */
export interface SaleSummaryListItem {
  orderId: number;
  dateTime: string;
  total: number;
  totalPaid: number;
  customerId: number | null;
  customerName: string;
  internalStatusName: string;
  internalStatusId: number;
  employeeName: string;
  statusName: string;
  statusId: number;
}

/**
 * Monthly sales summary for a branch: headline totals, income broken down by
 * payment method, and the list of sales that make up the period.
 */
export interface SaleSummaryReport {
  totalSales: number;
  totalPaid: number;
  salesCount: number;
  incomeByPaymentMethod: SaleSummaryIncomeByPaymentMethod[];
  salesList: SaleSummaryListItem[];
}
