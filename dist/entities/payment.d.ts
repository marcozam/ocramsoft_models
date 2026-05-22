import { BaseEntity } from '../core/base-entity';
export declare enum PaymentMethodType {
    CASH = "cash",
    CREDIT_CARD = "credit_card",
    TRANSFER = "transfer",
    CARD = "card"
}
/**
 * CatMetodoPago.ID values shared across services.
 */
export declare enum PaymentMethodId {
    CASH = 2,
    BANK_TRANSFER = 3,
    DEBIT_CARD = 5,
    CREDIT_CARD = 6
}
export declare function toPaymentMethodId(type: PaymentMethodType): PaymentMethodId;
export declare function toPaymentMethodTypeById(paymentMethodId: number): PaymentMethodType | undefined;
export interface Payment extends BaseEntity {
    type: PaymentMethodType;
    amount: number;
    reference?: string;
    initial?: boolean;
    received?: number;
}
//# sourceMappingURL=payment.d.ts.map