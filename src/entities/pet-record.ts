/**
 * Veterinary vertical — the parts of a pet's clinical file (expediente) that
 * are not a visit: reproductive status, signed consents and the euthanasia
 * record (NOM-033-SAG/ZOO-2014). Served under /veterinarian/pets/{petId}.
 */

/** `Mascotas.IDEstadoReproductivo`. */
export enum ReproductiveStatus {
  Intact = 1,
  Sterilized = 2,
  Pregnant = 3,
  Lactating = 4,
}

export const REPRODUCTIVE_STATUS_LABELS: Record<ReproductiveStatus, string> = {
  [ReproductiveStatus.Intact]: 'Entero',
  [ReproductiveStatus.Sterilized]: 'Esterilizado',
  [ReproductiveStatus.Pregnant]: 'Gestante',
  [ReproductiveStatus.Lactating]: 'Lactancia',
};

/** `ConsentimientoMascota.Tipo`. */
export enum ConsentType {
  General = 1,
  Anesthesia = 2,
  Surgery = 3,
  Hospitalization = 4,
  Euthanasia = 5,
  Recording = 6,
}

export const CONSENT_TYPE_LABELS: Record<ConsentType, string> = {
  [ConsentType.General]: 'Atención general y aviso de privacidad',
  [ConsentType.Anesthesia]: 'Anestesia',
  [ConsentType.Surgery]: 'Cirugía',
  [ConsentType.Hospitalization]: 'Hospitalización',
  [ConsentType.Euthanasia]: 'Eutanasia',
  [ConsentType.Recording]: 'Grabación de la consulta',
};

/**
 * A consent the owner signed. `text` is the exact wording they read, frozen
 * when it was signed. `text` and `signature` only come back from
 * GET /pets/{petId}/consents/{id} and from the POST that creates it.
 */
export interface PetConsent {
  /** Public GUID. */
  id: string;
  petId: string;
  type: ConsentType;
  typeName?: string;
  /** ISO 8601 UTC. */
  date: string;
  /** The visit the consent belongs to, if any. */
  recordId?: string | null;
  procedure?: string | null;
  risks?: string | null;
  text?: string;
  /** The owner (person) who signed, when it is a linked owner. */
  personId?: number | null;
  personName?: string | null;
  signerName: string;
  signerRelationship?: string | null;
  /** `data:image/png;base64,…` */
  signature?: string | null;
  hasSignature: boolean;
  /** Type `General`: version of the privacy notice the owner accepted. */
  noticeVersion?: string | null;
  professionalUserId?: number | null;
  createdAt?: string | null;
}

/** Body of POST /veterinarian/pets/{petId}/consents. */
export interface CreatePetConsentRequest {
  type: ConsentType;
  /** ISO 8601; omitted = now. */
  date?: string;
  recordId?: string | null;
  procedure?: string | null;
  risks?: string | null;
  text: string;
  personId?: number | null;
  signerName: string;
  signerRelationship?: string | null;
  /** `data:image/png;base64,…`, at most 300 KB. */
  signature?: string | null;
  noticeVersion?: string | null;
  professionalUserId?: number | null;
}

/**
 * Body of PUT /veterinarian/pets/{petId}/death: records a natural death
 * (`yyyy-MM-dd`); `null` clears it. Refused while a euthanasia record exists,
 * which owns the date of death.
 */
export interface UpdatePetDeathRequest {
  dateOfDeath: string | null;
  causeOfDeath?: string | null;
}

/**
 * The euthanasia record of a pet (NOM-033-SAG/ZOO-2014): one per pet. It
 * requires a signed consent of type `Euthanasia` and sets the pet's
 * `dateOfDeath`.
 */
export interface PetEuthanasia {
  /** Public GUID. */
  id: string;
  petId: string;
  /** The type-5 consent (public GUID). */
  consentId: string;
  recordId?: string | null;
  /** ISO 8601 UTC. */
  date: string;
  reason: string;
  method: string;
  premedication?: string | null;
  drug: string;
  productId?: number | null;
  productName?: string | null;
  /** Inventory lot (public GUID) the drug came from. */
  lotId?: string | null;
  lotCode?: string | null;
  /** `yyyy-MM-dd`. */
  lotExpiry?: string | null;
  dose: string;
  route: string;
  deathConfirmation: string;
  /** ISO 8601 UTC. */
  timeOfDeath?: string | null;
  bodyDisposal?: string | null;
  notes?: string | null;
  professionalUserId: number;
}

/** Body of POST /veterinarian/pets/{petId}/euthanasia. */
export interface CreatePetEuthanasiaRequest {
  consentId: string;
  recordId?: string | null;
  date?: string;
  reason: string;
  method: string;
  premedication?: string | null;
  drug: string;
  productId?: number | null;
  lotId?: string | null;
  dose: string;
  route: string;
  deathConfirmation: string;
  timeOfDeath?: string | null;
  bodyDisposal?: string | null;
  notes?: string | null;
  professionalUserId: number;
}

/**
 * A professional of the account as printed on clinical documents: name,
 * cédula and signature (`ProfesionalSalud`). `userId` is the local user id
 * used by `professionalUserId` on records.
 */
export interface VetProfessional {
  userId: number;
  printedName: string;
  license?: string | null;
  specialty?: string | null;
  specialtyLicense?: string | null;
  /** `data:image/png;base64,…`; only on GET /professionals/{userId}. */
  signature?: string | null;
  hasSignature: boolean;
  isActive: boolean;
}

/** Body of PUT /veterinarian/professionals/{userId}; `''` clears a text, `signature: null` keeps, `clearSignature` removes it. */
export interface UpsertVetProfessionalRequest {
  printedName: string;
  license?: string | null;
  specialty?: string | null;
  specialtyLicense?: string | null;
  signature?: string | null;
  clearSignature?: boolean;
  isActive?: boolean;
}

/** `ProblemaClinico.Estado`. */
export enum ClinicalProblemStatus {
  Active = 1,
  Controlled = 2,
  Resolved = 3,
}

export const CLINICAL_PROBLEM_STATUS_LABELS: Record<ClinicalProblemStatus, string> = {
  [ClinicalProblemStatus.Active]: 'Activo',
  [ClinicalProblemStatus.Controlled]: 'Controlado',
  [ClinicalProblemStatus.Resolved]: 'Resuelto',
};

/** An entry of the pet's problem list. */
export interface ClinicalProblem {
  /** Public GUID. */
  id: string;
  petId: string;
  name: string;
  status: ClinicalProblemStatus;
  /** `yyyy-MM-dd`. */
  onsetDate?: string | null;
  resolvedDate?: string | null;
  recordId?: string | null;
  caseId?: string | null;
  notes?: string | null;
}

/** Body of POST /pets/{petId}/problems; PUT takes it partially. */
export interface SaveClinicalProblemRequest {
  name?: string;
  status?: ClinicalProblemStatus;
  onsetDate?: string | null;
  resolvedDate?: string | null;
  recordId?: string | null;
  caseId?: string | null;
  notes?: string | null;
}

/** `ObservacionMordedura.Estado` (NOM-011-SSA2-2011, 10-day observation). */
export enum BiteObservationStatus {
  Observing = 1,
  ClosedHealthy = 2,
  Referred = 3,
  DeadSampleSent = 4,
}

export const BITE_OBSERVATION_STATUS_LABELS: Record<BiteObservationStatus, string> = {
  [BiteObservationStatus.Observing]: 'En observación',
  [BiteObservationStatus.ClosedHealthy]: 'Concluida sin signos',
  [BiteObservationStatus.Referred]: 'Signos compatibles, remitido',
  [BiteObservationStatus.DeadSampleSent]: 'Muerte, muestra enviada',
};

/** One daily check of a bite observation (day 1 to 10). */
export interface BiteObservationDay {
  day: number;
  /** `yyyy-MM-dd`. */
  date: string;
  noSigns: boolean;
  notes?: string | null;
}

export interface BiteObservation {
  /** Public GUID. */
  id: string;
  petId: string;
  /** `yyyy-MM-dd`. */
  biteDate: string;
  startDate: string;
  victim: string;
  victimContact?: string | null;
  physician?: string | null;
  physicianContact?: string | null;
  /** 1 clinic, 2 home. */
  place: 1 | 2;
  rabiesVaccineCurrent?: boolean | null;
  status: BiteObservationStatus;
  closedDate?: string | null;
  outcome?: string | null;
  notes?: string | null;
  professionalUserId?: number | null;
  /** Only on GET one. */
  days?: BiteObservationDay[];
}

/** Body of POST /pets/{petId}/bite-observations. */
export interface CreateBiteObservationRequest {
  biteDate: string;
  startDate?: string;
  victim: string;
  victimContact?: string | null;
  physician?: string | null;
  physicianContact?: string | null;
  place: 1 | 2;
  rabiesVaccineCurrent?: boolean | null;
  notes?: string | null;
  professionalUserId?: number | null;
}

/** Body of PUT /pets/{petId}/bite-observations/{id}/days/{day}. */
export interface SetBiteObservationDayRequest {
  date?: string;
  noSigns: boolean;
  notes?: string | null;
}

/** Body of POST /pets/{petId}/bite-observations/{id}/close. */
export interface CloseBiteObservationRequest {
  status: BiteObservationStatus.ClosedHealthy | BiteObservationStatus.Referred | BiteObservationStatus.DeadSampleSent;
  outcome: string;
  closedDate?: string;
}

/** `CertificadoSalud.Tipo`. */
export enum HealthCertificateType {
  NationalTravel = 1,
  InternationalTravel = 2,
  Rabies = 3,
  TravelSummary = 4,
}

export const HEALTH_CERTIFICATE_TYPE_LABELS: Record<HealthCertificateType, string> = {
  [HealthCertificateType.NationalTravel]: 'Certificado de salud (viaje nacional)',
  [HealthCertificateType.InternationalTravel]: 'Certificado de salud internacional',
  [HealthCertificateType.Rabies]: 'Certificado de vacunación antirrábica',
  [HealthCertificateType.TravelSummary]: 'Resumen sanitario para viaje',
};

/**
 * A certificate the clinic issued, with its consecutive folio. `data` is the
 * snapshot of what was printed, so a reprint is identical; only on GET one
 * and on the POST that issues it.
 */
export interface HealthCertificate {
  /** Public GUID. */
  id: string;
  petId: string;
  type: HealthCertificateType;
  folio: string;
  /** ISO 8601 UTC. */
  date: string;
  destination?: string | null;
  data?: Record<string, unknown>;
  applicationId?: string | null;
  professionalUserId?: number | null;
  voided: boolean;
  voidReason?: string | null;
}

/** Body of POST /pets/{petId}/certificates. */
export interface CreateHealthCertificateRequest {
  type: HealthCertificateType;
  date?: string;
  destination?: string | null;
  data: Record<string, unknown>;
  applicationId?: string | null;
  professionalUserId?: number | null;
}

/** One change to the clinical record (`ExpedienteAuditoria`). */
export interface RecordChange {
  id: string;
  /** Source table, e.g. `ExpedienteClinico`. */
  table: string;
  recordId: number;
  action: 'I' | 'U' | 'D';
  /** ISO 8601 UTC. */
  date: string;
  userId?: number | null;
  userName?: string | null;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
}
