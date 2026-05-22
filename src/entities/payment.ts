import { BaseEntity } from '../core/base-entity';

export enum PaymentMethodType {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  TRANSFER = 'transfer',
  CARD = 'card',
}

/**
 * CatMetodoPago.ID values shared across services.
 */
export enum PaymentMethodId {
  CASH = 2,
  BANK_TRANSFER = 3,
  DEBIT_CARD = 5,
  CREDIT_CARD = 6,
}

export function toPaymentMethodId(type: PaymentMethodType): PaymentMethodId {
  switch (type) {
    case PaymentMethodType.CASH:
      return PaymentMethodId.CASH;
    case PaymentMethodType.TRANSFER:
      return PaymentMethodId.BANK_TRANSFER;
    case PaymentMethodType.CARD:
      return PaymentMethodId.DEBIT_CARD;
    case PaymentMethodType.CREDIT_CARD:
      return PaymentMethodId.CREDIT_CARD;
    default:
      return PaymentMethodId.CASH;
  }
}

export function toPaymentMethodTypeById(
  paymentMethodId: number
): PaymentMethodType | undefined {
  switch (paymentMethodId) {
    case PaymentMethodId.CASH:
      return PaymentMethodType.CASH;
    case PaymentMethodId.BANK_TRANSFER:
      return PaymentMethodType.TRANSFER;
    case PaymentMethodId.DEBIT_CARD:
      return PaymentMethodType.CARD;
    case PaymentMethodId.CREDIT_CARD:
      return PaymentMethodType.CREDIT_CARD;
    default:
      return undefined;
  }
}

export interface Payment extends BaseEntity {
  type: PaymentMethodType;
  amount: number;
  reference?: string;
  initial?: boolean;
}
