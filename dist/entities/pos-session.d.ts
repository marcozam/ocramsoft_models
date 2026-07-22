import { BaseEntity } from '../core/base-entity';
export type PosSessionStatus = 'open' | 'closed' | 'suspended';
export interface PosSession extends BaseEntity {
    cashierId: string;
    cashierName?: string;
    branchId: string;
    branchName?: string;
    startTime: Date;
    initialCash: number;
    status: PosSessionStatus;
    pricingId?: string;
    stockLocationId?: string;
    transactionCount?: number;
    notes?: string;
    endTime?: Date;
    expectedCash?: number;
    finalCash?: number;
    salesCount?: number;
    totalSales?: number;
    cashDifference?: number;
}
/**
 * Per-payment-method money for a session, as served by
 * GET /pos/session/:id/expected-amounts — the single source of truth for the
 * close dialog and the session-detail breakdown.
 *
 * `expectedAmount` is always live (sales payments + cash float).
 * `receivedAmount`/`difference` come from the close record (CorteCajaDetalle)
 * and are null/absent while the session is still open.
 */
export interface PosSessionExpectedAmount {
    paymentMethodId: number;
    paymentMethodName: string;
    expectedAmount: number;
    receivedAmount?: number | null;
    difference?: number | null;
}
/**
 * Envelope of GET /pos/session/:id/expected-amounts: the per-method breakdown
 * plus the corte's sales totals (cancelled orders excluded).
 */
export interface PosSessionExpectedAmounts {
    expectedAmounts: PosSessionExpectedAmount[];
    salesCount: number;
    totalSales: number;
}
/**
 * Per-payment-method breakdown of a closed cash session, sourced from
 * CorteCajaDetalle. One row per method: opening float, what the system
 * expected, what the cashier counted, and the difference between them.
 */
export interface PosSessionPaymentBreakdown {
    paymentMethodId: number;
    paymentMethodName: string;
    initialAmount: number;
    expectedAmount: number;
    receivedAmount: number;
    difference: number;
}
export interface StartSessionRequest {
    branchId: string;
    initialCash: number;
}
export interface EndSessionRequest {
    finalCash: number;
    notes?: string;
}
//# sourceMappingURL=pos-session.d.ts.map