"use strict";
/**
 * Whether a vet service (consultation, applied product, complementary test)
 * has been charged: linked to the sale line that charged it, waived, or still
 * pending. Only services dated on or after the account's start date are
 * tracked; older ones have no charge entry at all.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargedServiceKind = void 0;
/** What kind of service a charge entry is about. */
var ChargedServiceKind;
(function (ChargedServiceKind) {
    /** A consultation (health record), charged with its record type's product. */
    ChargedServiceKind["Consultation"] = "consultation";
    /** A vaccine, rabies vaccine or dewormer applied (health application). */
    ChargedServiceKind["Application"] = "application";
    /** A complementary test (medical test), charged with its configured product. */
    ChargedServiceKind["Test"] = "test";
})(ChargedServiceKind || (exports.ChargedServiceKind = ChargedServiceKind = {}));
//# sourceMappingURL=service-charge.js.map