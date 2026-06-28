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
//# sourceMappingURL=sale-report.d.ts.map