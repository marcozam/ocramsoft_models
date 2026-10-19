"use strict";
/**
 * Veterinary vertical — the parts of a pet's clinical file (expediente) that
 * are not a visit: reproductive status, signed consents and the euthanasia
 * record (NOM-033-SAG/ZOO-2014). Served under /veterinarian/pets/{petId}.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSENT_TYPE_LABELS = exports.ConsentType = exports.REPRODUCTIVE_STATUS_LABELS = exports.ReproductiveStatus = void 0;
/** `Mascotas.IDEstadoReproductivo`. */
var ReproductiveStatus;
(function (ReproductiveStatus) {
    ReproductiveStatus[ReproductiveStatus["Intact"] = 1] = "Intact";
    ReproductiveStatus[ReproductiveStatus["Sterilized"] = 2] = "Sterilized";
    ReproductiveStatus[ReproductiveStatus["Pregnant"] = 3] = "Pregnant";
    ReproductiveStatus[ReproductiveStatus["Lactating"] = 4] = "Lactating";
})(ReproductiveStatus || (exports.ReproductiveStatus = ReproductiveStatus = {}));
exports.REPRODUCTIVE_STATUS_LABELS = {
    [ReproductiveStatus.Intact]: 'Entero',
    [ReproductiveStatus.Sterilized]: 'Esterilizado',
    [ReproductiveStatus.Pregnant]: 'Gestante',
    [ReproductiveStatus.Lactating]: 'Lactancia',
};
/** `ConsentimientoMascota.Tipo`. */
var ConsentType;
(function (ConsentType) {
    ConsentType[ConsentType["General"] = 1] = "General";
    ConsentType[ConsentType["Anesthesia"] = 2] = "Anesthesia";
    ConsentType[ConsentType["Surgery"] = 3] = "Surgery";
    ConsentType[ConsentType["Hospitalization"] = 4] = "Hospitalization";
    ConsentType[ConsentType["Euthanasia"] = 5] = "Euthanasia";
    ConsentType[ConsentType["Recording"] = 6] = "Recording";
})(ConsentType || (exports.ConsentType = ConsentType = {}));
exports.CONSENT_TYPE_LABELS = {
    [ConsentType.General]: 'Atención general y aviso de privacidad',
    [ConsentType.Anesthesia]: 'Anestesia',
    [ConsentType.Surgery]: 'Cirugía',
    [ConsentType.Hospitalization]: 'Hospitalización',
    [ConsentType.Euthanasia]: 'Eutanasia',
    [ConsentType.Recording]: 'Grabación de la consulta',
};
//# sourceMappingURL=pet-record.js.map