/**
 * Passwordless customer identity for public storefront flows.
 *
 * A customer proves who they are with only their phone number: they request a
 * WhatsApp OTP, verify it, and receive a short-lived token scoped to that
 * verified phone. The same token then authorizes any customer-facing flow —
 * appointment booking today, online sales/checkout next — so each flow only
 * consumes the identity, never re-implements it.
 */

/** Request body for POST /customer-auth/otp/request. */
export interface CustomerOtpRequest {
  /** Customer phone number in local digits (10-digit MX) — normalized server-side. */
  phone: string;
}

/** Request body for POST /customer-auth/otp/verify. */
export interface CustomerOtpVerifyRequest {
  phone: string;
  /** The 6-digit code received over WhatsApp. */
  code: string;
}

/**
 * The customer identity resolved after OTP verification.
 * When `exists` is false the frontend must ask for the customer's name before
 * the first write (booking, order, …); the account is created with it.
 */
export interface VerifiedCustomer {
  exists: boolean;
  /** Display name, present only when the customer already exists. */
  name?: string;
}

/** Response body for POST /customer-auth/otp/verify. */
export interface CustomerOtpVerifyResponse {
  /** Bearer token scoping subsequent customer-facing calls to the verified phone. */
  token: string;
  /** Token lifetime in seconds. */
  expiresIn: number;
  customer: VerifiedCustomer;
}
