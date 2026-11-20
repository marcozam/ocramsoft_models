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
 * When `exists` is false the frontend must collect the customer's name and
 * call POST /customer-auth/register — the access token is only ever issued
 * to an existing customer.
 */
export interface VerifiedCustomer {
    exists: boolean;
    /** Display name, present only when the customer already exists. */
    name?: string;
    /** E-mail on file, present only when the customer exists and has one (checkout prefill). */
    email?: string;
}
/**
 * A full customer access grant. The token carries the customer identifier
 * (PublicId GUID), so every customer-facing API extracts the customer from
 * the token itself.
 */
export interface CustomerTokenGrant {
    /** Bearer token scoped to the identified customer. */
    token: string;
    /** Token lifetime in seconds. */
    expiresIn: number;
    customer: VerifiedCustomer;
}
/**
 * Response body for POST /customer-auth/otp/verify.
 *
 * Exactly one of the two grants is present:
 * - existing customer → `token` + `expiresIn` (full access grant);
 * - unknown phone → `registrationToken` + `registrationExpiresIn`, which only
 *   authorizes POST /customer-auth/register.
 */
export interface CustomerOtpVerifyResponse {
    customer: VerifiedCustomer;
    /** Access token; present only when the customer exists. */
    token?: string;
    expiresIn?: number;
    /** Registration-only token; present only when the customer does not exist. */
    registrationToken?: string;
    registrationExpiresIn?: number;
}
/** Request body for POST /customer-auth/register (registration token required). */
export interface RegisterCustomerRequest {
    /** Customer display name captured by the frontend after OTP verification. */
    name: string;
}
/**
 * Body of `POST /customer-auth/guest`: a shopper buying without a WhatsApp
 * code. The phone is not verified, so the grant never shows saved data.
 */
export interface CustomerGuestRequest {
    phone: string;
    name: string;
}
/**
 * Guest grant: places an order and reads its status. It never lists saved
 * addresses or cards; that takes the OTP grant (`CustomerTokenGrant`). The
 * response is the same whether or not the phone already has a customer.
 */
export interface CustomerGuestGrant {
    token: string;
    /** Token lifetime in seconds. */
    expiresIn: number;
}
/** Request body for POST /customer-auth/identify: the phone typed first at checkout. */
export interface CustomerIdentifyRequest {
    phone: string;
}
/**
 * Response body for POST /customer-auth/identify. A known phone is a returning
 * customer: the WhatsApp code is sent right away (`codeSent`), and verifying it
 * opens the saved data. An unknown phone buys without a code
 * (POST /customer-auth/guest with the name).
 */
export interface CustomerIdentifyResponse {
    known: boolean;
    /** A code went out now; false when known but another was asked for too soon. */
    codeSent: boolean;
    /** Known and throttled: seconds until a new code may be sent. */
    retryAfterSeconds?: number;
}
//# sourceMappingURL=customer-auth.d.ts.map