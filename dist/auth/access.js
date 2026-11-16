"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBeta = exports.hasFeature = exports.hasModule = exports.hasPermission = exports.hasAccessClaims = exports.readAccessClaims = exports.EMPTY_ACCESS_CLAIMS = void 0;
/** An empty grant: what a token issued before the claims existed carries. */
exports.EMPTY_ACCESS_CLAIMS = Object.freeze({
    mods: [],
    perms: [],
    feats: [],
    beta: [],
});
const codes = (value) => Array.isArray(value)
    ? value.filter((v) => typeof v === 'string' && v.length > 0)
    : [];
/** Reads the access claims of a decoded token; missing ones are empty. */
const readAccessClaims = (claims) => {
    const c = (claims ?? {});
    return {
        mods: codes(c.mods),
        perms: codes(c.perms),
        feats: codes(c.feats),
        beta: codes(c.beta),
    };
};
exports.readAccessClaims = readAccessClaims;
/** Whether the token carries the access claims at all (issued after phase 2). */
const hasAccessClaims = (claims) => Array.isArray(claims?.perms);
exports.hasAccessClaims = hasAccessClaims;
/** Any-of: true when the user holds at least one of the permissions. */
const hasPermission = (access, ...permissions) => !!access && permissions.some((p) => access.perms.includes(p));
exports.hasPermission = hasPermission;
/** Whether the account has the module enabled. */
const hasModule = (access, module) => !!access && access.mods.includes(module);
exports.hasModule = hasModule;
/** Whether the account has the feature enabled (a flag with no permissions). */
const hasFeature = (access, feature) => !!access && access.feats.includes(feature);
exports.hasFeature = hasFeature;
/** Whether an enabled module or feature is in beta (the «Beta» badge). */
const isBeta = (access, code) => !!access && access.beta.includes(code);
exports.isBeta = isBeta;
//# sourceMappingURL=access.js.map