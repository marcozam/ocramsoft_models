// src/entities/sale-report.ts
//
// Shared contract for the sale reporting endpoints exposed by the gateway
// (GET /pos/sale/report/summary) and consumed by the lock-security-portal
// reporting module.

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
