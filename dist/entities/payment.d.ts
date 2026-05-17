import { BaseEntity } from '../core/base-entity';
export declare enum PaymentMethodType {
    CASH = "cash",
    CREDIT_CARD = "credit_card",
    TRANSFER = "transfer",
    CARD = "card"
}
export interface Payment extends BaseEntity {
    type: PaymentMethodType;
    amount: number;
    reference?: string;
    initial?: boolean;
}
//# sourceMappingURL=payment.d.ts.map