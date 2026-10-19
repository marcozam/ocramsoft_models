import type { HealthRecord, HealthRecordFile } from './health-record';
import type { TestAttributeDataType } from './medical-test';
import type { AppointmentStatus } from './appointment';

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
export enum ClinicalCaseStatus {
  /** Opened; only its first visit so far. */
  OPEN = 40501,
  /** A follow-up visit was recorded (or the case was reopened). */
  FOLLOW_UP = 40502,
  RESOLVED = 40503,
  /** Controlled chronic problem; closed without a cure. */
  CHRONIC = 40504,
  CANCELLED = 40505,
}

/** The statuses a case can be closed with. */
export type ClinicalCaseClosingStatus =
  | ClinicalCaseStatus.RESOLVED
  | ClinicalCaseStatus.CHRONIC
  | ClinicalCaseStatus.CANCELLED;

/** The `evolucion` attribute of a visit: how the problem moved since the last one. */
export type CaseVisitEvolution = 'MEJORA' | 'ESTABLE' | 'EMPEORA';

/** A clinical case, as listed for a pet and as the header of its detail. */
export interface ClinicalCase {
  /** Internal id (staff-facing). */
  id: string;
  /** Frontend-safe GUID; the /veterinarian/cases routes address the case by it. */
  publicId: string;
  petId: string;
  title: string;
  /** The case's specialty (a record type); visits of any type may belong to it. */
  recordTypeId: number;
  recordType?: string;
  status: ClinicalCaseStatus;
  statusName?: string;
  /** When the problem started (`yyyy-MM-dd`), consolidated from the first visit. */
  onsetDate: string | null;
  /** ISO datetime the case was opened. */
  openedAt: string;
  closedAt: string | null;
  /** The case's presumptive diagnosis, written by the latest visit that carries one. */
  presumptiveDiagnosis: string | null;
  /** The case's final diagnosis, written by the latest visit that carries one. */
  finalDiagnosis: string | null;
  /** How the case ended (cured, chronic control, referred, lost to follow-up). */
  closingOutcome: string | null;
  /** Responsible vet. */
  professionalUserId: number | null;
  /** Active visits of the case. */
  visitsCount: number;
  lastVisitId: string | null;
  lastVisitDate: string | null;
  /** The `evolucion` captured in the last visit, when it was. */
  lastVisitEvolution: CaseVisitEvolution | string | null;
  /** The next pending follow-up appointment of the case. */
  nextAppointmentAt: string | null;
  nextAppointmentPublicId: string | null;
  /** Open case without a visit in 90 days and no pending appointment. */
  inactive: boolean;
  isActive: boolean;
}

/** One visit of a case in its timeline. */
export interface CaseVisitSummary {
  recordId: string;
  date: string | null;
  recordTypeId: number;
  recordType?: string;
  reason: string | null;
  evolution: CaseVisitEvolution | string | null;
  diagnosis: string | null;
  finalDiagnosis: string | null;
  treatment: string | null;
  professionalUserId: number | null;
  appointmentId: string | null;
  /** Active photos attached to the visit. */
  photosCount: number;
  /** Active studies linked to the visit. */
  testsCount: number;
}

/** A pending follow-up appointment of a case (scheduled, confirmed or in progress). */
export interface CasePendingAppointment {
  id: number;
  publicId: string;
  branchId: number;
  start: string;
  end: string;
  status: AppointmentStatus;
  statusName?: string;
  reason: string | null;
}

/** GET /veterinarian/cases/{publicId}: the case with its visits and pending appointments. */
export interface ClinicalCaseDetail extends ClinicalCase {
  /** In date order, oldest first. */
  visits: CaseVisitSummary[];
  /** Nearest first. */
  pendingAppointments: CasePendingAppointment[];
}

/** One value of a trend attribute captured in a visit of the case. */
export interface CaseTrendPoint {
  recordId: string;
  date: string | null;
  attributeId: number;
  key: string | null;
  attributeName: string;
  dataType: TestAttributeDataType;
  unit: string | null;
  refMin: number | null;
  refMax: number | null;
  numericValue: number | null;
  textValue: string | null;
  /** Prefilled from the previous visit and not touched: the chart greys it out. */
  copied: boolean;
}

/** A photo of a visit, for the side-by-side view (`description` is the anatomical zone). */
export interface CaseVisitPhoto extends HealthRecordFile {
  /** Date of the visit the photo belongs to. */
  date: string | null;
}

/** A study linked to a visit of the case. */
export interface CaseVisitTest {
  recordId: string;
  testId: string;
  date: string | null;
  testTypeId: number;
  testType?: string;
}

/** One visit in the progress view: its evolution, diagnosis and treatment of the day. */
export interface CaseProgressVisit {
  recordId: string;
  date: string | null;
  recordTypeId: number;
  recordType?: string;
  reason: string | null;
  evolution: CaseVisitEvolution | string | null;
  diagnosis: string | null;
  finalDiagnosis: string | null;
  /** The treatment of the day; the last visit's is the current treatment. */
  treatment: string | null;
}

/**
 * GET /veterinarian/cases/{publicId}/progress: the series of the progress
 * view, every list in visit date order (oldest first).
 */
export interface CaseProgress {
  visits: CaseProgressVisit[];
  /** Per visit, the attributes flagged `trend` that were captured (pruritus, weight...). */
  trends: CaseTrendPoint[];
  photos: CaseVisitPhoto[];
  tests: CaseVisitTest[];
}

/**
 * GET /veterinarian/cases/{publicId}/last-visit: the last visit of the case
 * with its values (`vitals`, each flagged `copied` when it was itself a copy),
 * to prefill the follow-up; `null` when the case has no visit yet.
 */
export type CaseLastVisit = HealthRecord | null;

/**
 * Body of POST /veterinarian/pets/{petId}/cases. `firstRecordId` links the
 * visit the case is opened from (it must be the pet's, active and without a
 * case) and lends its reason as `title`, its onset date and its presumptive
 * diagnosis when they are omitted; without it `title` is required.
 */
export interface CreateClinicalCaseRequest {
  title?: string;
  recordTypeId: number;
  professionalUserId?: number;
  /** `yyyy-MM-dd`. */
  onsetDate?: string;
  presumptiveDiagnosis?: string;
  /** Internal id of the opening visit, as a string. */
  firstRecordId?: string;
}

/**
 * Body of PUT /veterinarian/cases/{publicId}. Omitted keeps; `null` or `''`
 * clears a diagnosis. A closed case can be edited.
 */
export interface UpdateClinicalCaseRequest {
  title?: string;
  presumptiveDiagnosis?: string | null;
  finalDiagnosis?: string | null;
  professionalUserId?: number;
}

/**
 * Body of POST /veterinarian/cases/{publicId}/close. Pending follow-up
 * appointments of the case block the close (409) unless
 * `cancelAppointments` is true, which cancels them. Visits are never touched;
 * POST /veterinarian/cases/{publicId}/reopen puts the case back in follow-up.
 */
export interface CloseClinicalCaseRequest {
  status: ClinicalCaseClosingStatus;
  /** How the case ended (cured, chronic control, referred, lost to follow-up). */
  outcome?: string | null;
  /** Omitted keeps the case's final diagnosis. */
  finalDiagnosis?: string | null;
  cancelAppointments?: boolean;
}
