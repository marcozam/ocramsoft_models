"use strict";
/**
 * Veterinary prescriptions (recetas): what the vet prescribes a pet, printed on
 * the clinic's letterhead with a consecutive `RX-` folio per account. A
 * prescription is never edited or deleted: it is annulled and keeps its folio.
 *
 * Ids follow the API's conventions: prescriptions by PublicId; pets,
 * products, branches and health records by their id as a string; users and
 * routes of administration by their numeric id.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRESCRIPTION_DOSE_UNIT_LABELS = exports.PRESCRIPTION_DOSE_UNITS = void 0;
exports.PRESCRIPTION_DOSE_UNITS = [
    'ml',
    'tableta',
    'capsula',
    'mg',
    'gota',
    'aplicacion',
    'sobre',
    'pieza',
];
/** Singular label of each unit, as printed («1 cápsula»). */
exports.PRESCRIPTION_DOSE_UNIT_LABELS = {
    ml: 'ml',
    tableta: 'tableta',
    capsula: 'cápsula',
    mg: 'mg',
    gota: 'gota',
    aplicacion: 'aplicación',
    sobre: 'sobre',
    pieza: 'pieza',
};
//# sourceMappingURL=prescription.js.map