/**
 * Access by e-mailed link (auth service): invitations, an administrator's
 * reset link and the confirmation of a linked e-mail.
 * POST|DELETE /users/:id/invitation, POST /users/:id/password-reset-link,
 * POST /users/:id/email-confirmation, GET /auth/verifications/:requestId.
 */
/** 200 answer of the admin endpoints that send a link. */
export interface AccessLinkSent {
    /** When the link expires (ISO, UTC). */
    expiresAt: string;
}
/** POST /users/:id/password-reset-link body. */
export interface PasswordResetLinkRequest {
    /** The current password stops working now and every session ends. */
    lockCurrent?: boolean;
}
/** `errorCode` of a refused admin link (409, or 400 for no_email, 429 throttled). */
export type UserAccessErrorCode = 'inactive' | 'no_email' | 'email_unconfirmed' | 'has_password' | 'no_password' | 'nothing_to_confirm' | 'throttled';
/** The purposes a link opens a page for. */
export type VerificationLinkPurpose = 'invitacion_usuario' | 'restablecer_por_admin' | 'recuperar_contrasena' | 'confirmar_correo';
/**
 * GET /auth/verifications/:requestId: what the page shows. Read only: the
 * page confirms the code when the person presses its button, never on load.
 */
export interface VerificationPeek {
    purpose: VerificationLinkPurpose;
    /** The code can still be confirmed. */
    open: boolean;
    accountName: string | null;
    /** The login. */
    userName: string | null;
    name: string | null;
    /** The address being confirmed (confirmar_correo only). */
    email: string | null;
}
//# sourceMappingURL=user-access.d.ts.map