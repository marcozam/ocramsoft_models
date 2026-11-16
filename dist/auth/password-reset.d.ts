/**
 * «Olvidé mi contraseña» and the generic verification codes of the auth
 * service (SIOS_AUTH SysVerificaciones). Endpoints:
 * POST /auth/password-reset, POST /auth/verifications/:requestId/confirm,
 * POST /auth/password-reset/complete.
 */
/** POST /auth/password-reset body. */
export interface PasswordResetRequest {
    /** The user name as typed on the login. */
    userName: string;
}
/**
 * 202 answer of POST /auth/password-reset. The same whether or not the user
 * exists: it never reveals who has an account.
 */
export interface PasswordResetStarted {
    requestId: string;
    /** Seconds the code stays valid. */
    expiresInSeconds: number;
    /** Seconds before another code may be asked for. */
    resendAfterSeconds: number;
}
/** POST /auth/verifications/:requestId/confirm body. */
export interface VerificationConfirmRequest {
    /** Six digits. */
    code: string;
}
/** 200 answer of the confirmation. */
export interface VerificationConfirmed {
    verified: true;
    /** One-time token, only for purposes with a last step (password reset). */
    token?: string;
    /** Seconds the token stays valid. */
    expiresInSeconds?: number;
}
/** POST /auth/password-reset/complete body (answers 204). */
export interface PasswordResetCompleteRequest {
    requestId: string;
    token: string;
    newPassword: string;
}
/** `errorCode` of a refused step. */
export type VerificationErrorCode = 'invalid' | 'invalid_code' | 'wrong_code' | 'code_expired' | 'no_attempts' | 'throttled' | 'weak_password' | 'same_password' | 'token_expired';
//# sourceMappingURL=password-reset.d.ts.map