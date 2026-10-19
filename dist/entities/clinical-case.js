"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalCaseStatus = void 0;
/**
 * Veterinary vertical — clinical cases (CasoClinico): several visits of a pet
 * grouped under one problem ("Otitis bilateral"), opened on the first visit
 * and closed when it resolves. A follow-up appointment is born from the case
 * and the consultation started from it inherits the case. Served under
 * /veterinarian/pets/{petId}/cases and /veterinarian/cases/{publicId}.
 */
/**
 * Case lifecycle. Values match the SysMD CatStatus rows seeded under
 * IDUso = 405 (CASO CLINICO), so the numeric value is the database status id.
 */
var ClinicalCaseStatus;
(function (ClinicalCaseStatus) {
    /** Opened; only its first visit so far. */
    ClinicalCaseStatus[ClinicalCaseStatus["OPEN"] = 40501] = "OPEN";
    /** A follow-up visit was recorded (or the case was reopened). */
    ClinicalCaseStatus[ClinicalCaseStatus["FOLLOW_UP"] = 40502] = "FOLLOW_UP";
    ClinicalCaseStatus[ClinicalCaseStatus["RESOLVED"] = 40503] = "RESOLVED";
    /** Controlled chronic problem; closed without a cure. */
    ClinicalCaseStatus[ClinicalCaseStatus["CHRONIC"] = 40504] = "CHRONIC";
    ClinicalCaseStatus[ClinicalCaseStatus["CANCELLED"] = 40505] = "CANCELLED";
})(ClinicalCaseStatus || (exports.ClinicalCaseStatus = ClinicalCaseStatus = {}));
//# sourceMappingURL=clinical-case.js.map