/**
 * What a user may do in the account of the session, as the access token
 * carries it (computed by SIOS_AUTH `SYS_GetAccesoUsuario` at login and at
 * every refresh). The account is the ceiling: `perms` only holds permissions of
 * features the account has enabled.
 *
 * Codes are plain strings: the database may know codes newer than this
 * package. Compare them with the generated constants (`Module`, `Feature`,
 * `Permission`).
 */
export interface AccessClaims {
  /** Modules enabled for the account (`core`, `pos`, …). */
  mods: string[];
  /** Effective permissions of the user in the account (`pos.sales.create`). */
  perms: string[];
  /** Features enabled for the account (`pos.discounts`). */
  feats: string[];
  /** The modules and features of `mods` / `feats` that are in beta. */
  beta: string[];
}

/** An empty grant: what a token issued before the claims existed carries. */
export const EMPTY_ACCESS_CLAIMS: AccessClaims = Object.freeze({
  mods: [],
  perms: [],
  feats: [],
  beta: [],
}) as AccessClaims;

const codes = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((v): v is string => typeof v === 'string' && v.length > 0)
    : [];

/** Reads the access claims of a decoded token; missing ones are empty. */
export const readAccessClaims = (claims: unknown): AccessClaims => {
  const c = (claims ?? {}) as Partial<Record<keyof AccessClaims, unknown>>;
  return {
    mods: codes(c.mods),
    perms: codes(c.perms),
    feats: codes(c.feats),
    beta: codes(c.beta),
  };
};

/** Whether the token carries the access claims at all (issued after phase 2). */
export const hasAccessClaims = (claims: unknown): boolean =>
  Array.isArray((claims as { perms?: unknown } | null | undefined)?.perms);

/** Any-of: true when the user holds at least one of the permissions. */
export const hasPermission = (
  access: Pick<AccessClaims, 'perms'> | null | undefined,
  ...permissions: string[]
): boolean =>
  !!access && permissions.some((p) => access.perms.includes(p));

/** Whether the account has the module enabled. */
export const hasModule = (
  access: Pick<AccessClaims, 'mods'> | null | undefined,
  module: string
): boolean => !!access && access.mods.includes(module);

/** Whether the account has the feature enabled (a flag with no permissions). */
export const hasFeature = (
  access: Pick<AccessClaims, 'feats'> | null | undefined,
  feature: string
): boolean => !!access && access.feats.includes(feature);

/** Whether an enabled module or feature is in beta (the «Beta» badge). */
export const isBeta = (
  access: Pick<AccessClaims, 'beta'> | null | undefined,
  code: string
): boolean => !!access && access.beta.includes(code);
