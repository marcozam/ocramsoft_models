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
 * Payment is settled up-front, by bank transfer (SPEI) or by card:
 * - `bank_transfer`: the order is created as `pending_payment` and the
 *   confirmation returns the business bank account plus the order folio to use
 *   as the transfer reference; staff confirm it when the transfer arrives.
 * - `card`: the order is created as `pending_payment` and the confirmation
 *   returns `checkoutUrl`, the card processor's hosted payment page. When the
 *   processor confirms the charge the order becomes `confirmed` (paid, pending
 *   fulfillment) and the customer receives a confirmation e-mail; the card can
 *   be saved for the next purchase. Card data never reaches our servers.
 *
 * The shopper chooses how to receive it (`fulfillment`): local delivery to an
 * address in the store's delivery area, charged per order and free from a
 * products total, or pickup at the store, with a discount from that same
 * total. The rules are served by GET /online-store/pricing
 * (`OnlineStorePricing.fulfillment`) and applied again by the server.
 */

/** How the shopper pays the order. */
export type OnlineOrderPaymentMethod = 'bank_transfer' | 'card';

/** How the order reaches the shopper. */
export type OnlineOrderFulfillment = 'delivery' | 'pickup';

/** One cart line as submitted at checkout. Prices are resolved server-side. */
export interface OnlineOrderItemRequest {
  /** Product id as served by GET /online-store/products. */
  productId: string;
  quantity: number;
}

/**
 * Request body for POST /online-store/orders (customer token required).
 *
 * For `delivery` (the default) exactly one shipping destination must be
 * given: `shippingAddressId` to reuse an address the customer already has (see
 * `GET /online-store/addresses`), or `shippingAddress` to add a new one, which
 * is linked to the customer as part of the order. `pickup` takes neither.
 */
export interface PlaceOnlineOrderRequest {
  items: OnlineOrderItemRequest[];
  /** How the order reaches the shopper; absent = `delivery`. */
  fulfillment?: OnlineOrderFulfillment;
  /** Id of an address already owned by the customer. */
  shippingAddressId?: string;
  /** New shipping destination; validated with the shared address rules. */
  shippingAddress?: Address;
  /** Cross-streets, facade, reception hours — free text for the carrier. */
  shippingReferences?: string;
  paymentMethod: OnlineOrderPaymentMethod;
  /**
   * Where the order confirmation is e-mailed. Required with `card`; it is also
   * kept as the customer's e-mail when they have none yet.
   */
  email?: string;
  /**
   * `card` only: storefront URLs the payment page returns to. They must be
   * under an origin the store allows; `{ORDER_ID}` is replaced by `orderId`.
   */
  successUrl?: string;
  cancelUrl?: string;
  /** Customer note for the order. */
  comment?: string;
}

/**
 * Customer-facing lifecycle of an online order. `pending_payment` until the
 * payment arrives (staff validate a transfer; the processor confirms a card);
 * `confirmed` once payment is registered (the order waits to be shipped);
 * `cancelled` when it was cancelled or its card payment page expired unpaid.
 */
export type OnlineOrderStatus = 'pending_payment' | 'confirmed' | 'cancelled';

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
  /** Server-computed amount to pay: products + shipping fee − pickup discount. */
  total: number;
  /** How the order reaches the shopper. */
  fulfillment?: OnlineOrderFulfillment;
  /** Shipping fee charged in `total` (0 = free or pickup). */
  shippingFee?: number;
  /** Pickup discount taken off `total`. */
  discount?: number;
  /** ISO 4217 currency (e.g. `MXN`). */
  currency: string;
  paymentMethod: OnlineOrderPaymentMethod;
  /** `bank_transfer` only: the account to wire the total to. */
  bankTransfer?: BankTransferInfo;
  /** `card` only: the processor's hosted payment page to send the shopper to. */
  checkoutUrl?: string;
  estimatedShippingDays: EstimatedShippingDays;
}

/** Response body for GET /online-store/orders/:id (customer token required). */
export interface OnlineOrderStatusResponse {
  orderId: string;
  folio: string;
  status: OnlineOrderStatus;
  total: number;
  currency: string;
}
