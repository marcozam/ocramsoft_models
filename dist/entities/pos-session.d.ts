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
export interface PosSessionExpectedAmount {
    paymentMethodId: number;
    paymentMethodName: string;
    expectedAmount: number;
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