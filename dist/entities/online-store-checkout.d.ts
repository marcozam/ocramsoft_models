import { Address } from './address';
/**
 * Online-store checkout (public storefront flow).
 *
 * Identity comes from the generic customer-auth flow (`customer-auth.ts`):
 * the shopper verifies their phone via WhatsApp OTP and receives a customer
 * token (new phones register first). That bearer token authorizes
 * POST /online-store/orders — the order body carries no contact block and the
 * backend resolves the customer from the token itself.
 *
 * Payment is settled up-front by bank transfer (SPEI): the order is created
 * as `pending_payment` and the confirmation returns the business bank account
 * plus the order folio to use as the transfer reference. Every order is
 * shipped — there is no local delivery or pickup — and the shipping cost is
 * quoted per destination over WhatsApp after the order is placed.
 */
/** The only payment method the online store accepts today. */
export type OnlineOrderPaymentMethod = 'bank_transfer';
/** One cart line as submitted at checkout. Prices are resolved server-side. */
export interface OnlineOrderItemRequest {
    /** Product id as served by GET /online-store/products. */
    productId: string;
    quantity: number;
}
/**
 * Request body for POST /online-store/orders (customer token required).
 *
 * Exactly one shipping destination must be given: `shippingAddressId` to reuse
 * an address the customer already has (see `GET /online-store/addresses`), or
 * `shippingAddress` to add a new one, which is linked to the customer as part
 * of the order.
 */
export interface PlaceOnlineOrderRequest {
    items: OnlineOrderItemRequest[];
    /** Id of an address already owned by the customer. */
    shippingAddressId?: string;
    /** New shipping destination; validated with the shared address rules. */
    shippingAddress?: Address;
    /** Cross-streets, facade, reception hours — free text for the carrier. */
    shippingReferences?: string;
    paymentMethod: OnlineOrderPaymentMethod;
    /** Customer note for the order. */
    comment?: string;
}
/**
 * Customer-facing lifecycle of an online order. `pending_payment` until staff
 * validate the transfer receipt; `confirmed` once payment is registered.
 */
export type OnlineOrderStatus = 'pending_payment' | 'confirmed';
/** Bank account the customer must wire the order total to. */
export interface BankTransferInfo {
    /** Bank display name, e.g. "BBVA". */
    bankName: string;
    /** Account holder exactly as registered with the bank. */
    accountHolder: string;
    /** 18-digit CLABE interbancaria. */
    clabe: string;
    /** Optional card number for SPEI-to-card transfers. */
    cardNumber?: string;
}
/** Shipping ETA in business days, counted from payment confirmation. */
export interface EstimatedShippingDays {
    min: number;
    max: number;
}
/** Response body for POST /online-store/orders. */
export interface OnlineOrderConfirmation {
    /** Order PublicId GUID — internal integer ids are never exposed. */
    orderId: string;
    /** Human-facing folio — also the bank-transfer reference/concepto. */
    folio: string;
    status: OnlineOrderStatus;
    /** Server-computed products total (shipping is quoted separately). */
    total: number;
    /** ISO 4217 currency (e.g. `MXN`). */
    currency: string;
    bankTransfer: BankTransferInfo;
    estimatedShippingDays: EstimatedShippingDays;
}
//# sourceMappingURL=online-store-checkout.d.ts.map