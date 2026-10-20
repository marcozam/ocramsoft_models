"use strict";
/**
 * Veterinary vertical — the parts of a pet's clinical file (expediente) that
 * are not a visit: reproductive status, signed consents and the euthanasia
 * record (NOM-033-SAG/ZOO-2014). Served under /veterinarian/pets/{petId}.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEALTH_CERTIFICATE_TYPE_LABELS = exports.HealthCertificateType = exports.BITE_OBSERVATION_STATUS_LABELS = exports.BiteObservationStatus = exports.CLINICAL_PROBLEM_STATUS_LABELS = exports.ClinicalProblemStatus = exports.CONSENT_TYPE_LABELS = exports.ConsentType = exports.REPRODUCTIVE_STATUS_LABELS = exports.ReproductiveStatus = void 0;
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
/** `ProblemaClinico.Estado`. */
var ClinicalProblemStatus;
(function (ClinicalProblemStatus) {
    ClinicalProblemStatus[ClinicalProblemStatus["Active"] = 1] = "Active";
    ClinicalProblemStatus[ClinicalProblemStatus["Controlled"] = 2] = "Controlled";
    ClinicalProblemStatus[ClinicalProblemStatus["Resolved"] = 3] = "Resolved";
})(ClinicalProblemStatus || (exports.ClinicalProblemStatus = ClinicalProblemStatus = {}));
exports.CLINICAL_PROBLEM_STATUS_LABELS = {
    [ClinicalProblemStatus.Active]: 'Activo',
    [ClinicalProblemStatus.Controlled]: 'Controlado',
    [ClinicalProblemStatus.Resolved]: 'Resuelto',
};
/** `ObservacionMordedura.Estado` (NOM-011-SSA2-2011, 10-day observation). */
var BiteObservationStatus;
(function (BiteObservationStatus) {
    BiteObservationStatus[BiteObservationStatus["Observing"] = 1] = "Observing";
    BiteObservationStatus[BiteObservationStatus["ClosedHealthy"] = 2] = "ClosedHealthy";
    BiteObservationStatus[BiteObservationStatus["Referred"] = 3] = "Referred";
    BiteObservationStatus[BiteObservationStatus["DeadSampleSent"] = 4] = "DeadSampleSent";
})(BiteObservationStatus || (exports.BiteObservationStatus = BiteObservationStatus = {}));
exports.BITE_OBSERVATION_STATUS_LABELS = {
    [BiteObservationStatus.Observing]: 'En observación',
    [BiteObservationStatus.ClosedHealthy]: 'Concluida sin signos',
    [BiteObservationStatus.Referred]: 'Signos compatibles, remitido',
    [BiteObservationStatus.DeadSampleSent]: 'Muerte, muestra enviada',
};
/** `CertificadoSalud.Tipo`. */
var HealthCertificateType;
(function (HealthCertificateType) {
    HealthCertificateType[HealthCertificateType["NationalTravel"] = 1] = "NationalTravel";
    HealthCertificateType[HealthCertificateType["InternationalTravel"] = 2] = "InternationalTravel";
    HealthCertificateType[HealthCertificateType["Rabies"] = 3] = "Rabies";
    HealthCertificateType[HealthCertificateType["TravelSummary"] = 4] = "TravelSummary";
})(HealthCertificateType || (exports.HealthCertificateType = HealthCertificateType = {}));
exports.HEALTH_CERTIFICATE_TYPE_LABELS = {
    [HealthCertificateType.NationalTravel]: 'Certificado de salud (viaje nacional)',
    [HealthCertificateType.InternationalTravel]: 'Certificado de salud internacional',
    [HealthCertificateType.Rabies]: 'Certificado de vacunación antirrábica',
    [HealthCertificateType.TravelSummary]: 'Resumen sanitario para viaje',
};
//# sourceMappingURL=pet-record.js.map