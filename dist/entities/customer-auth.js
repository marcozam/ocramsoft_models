"use strict";
/**
 * Passwordless customer identity for public storefront flows.
 *
 * A customer proves who they are with only their phone number: they request a
 * WhatsApp OTP, verify it, and receive a short-lived token scoped to that
 * verified phone. The same token then authorizes any customer-facing flow —
 * appointment booking today, online sales/checkout next — so each flow only
 * consumes the identity, never re-implements it.
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=customer-auth.js.map