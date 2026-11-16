import { BaseEntity } from '../core/base-entity';

export enum UserRole {
  SYSTEM = 'system',
  ADMIN = 'admin',
  USER = 'user',
  LOCK = 'lock',
  MANAGER = 'manager',
  CUSTOMER = 'customer',
}

/**
 * How a user gets in today: password (has one) · invited (none, the
 * invitation is open) · invite_expired (none, it expired) · google (Google
 * only) · none (an administrator must give a way in).
 */
export type UserAccess =
  | 'password'
  | 'invited'
  | 'invite_expired'
  | 'google'
  | 'none';

export interface User extends BaseEntity {
  userName: string;
  name: string;
  roles?: UserRole[];
  isActive?: boolean;
  lastLogin?: Date;
  accountId?: number;
  /** Where access e-mails go; not a login (users sign in with userName). */
  email?: string | null;
  /** The user opened a link sent to `email`. */
  emailConfirmed?: boolean;
  /** A new address waiting for confirmation; `email` stays in use meanwhile. */
  pendingEmail?: string | null;
  access?: UserAccess;
  /** Expiry (ISO, UTC) of the invitation of a user without a password. */
  invitationExpiresAt?: string | null;
}

/** POST /users body (auth service). */
export interface CreateUserRequest {
  userName: string;
  name: string;
  /** Defaults to userName when it is an e-mail. */
  email?: string;
  /**
   * invite: no password, an e-mailed link (7 days) lets the user choose it
   * (needs an e-mail) · password: temporaryPassword. Default: password when
   * temporaryPassword is sent, else invite.
   */
  access?: 'invite' | 'password';
  temporaryPassword?: string;
  roles?: UserRole[];
}

/** PUT /users/:id body (auth service); every field optional. */
export interface UpdateUserRequest {
  userName?: string;
  name?: string;
  roles?: UserRole[];
  isActive?: boolean;
  /** null or '' removes it. */
  email?: string | null;
}
