/**
 * Veterinary prescriptions (recetas): what the vet prescribes a pet, printed on
 * the clinic's letterhead with a consecutive `RX-` folio per account. A
 * prescription is never edited or deleted: it is annulled and keeps its folio.
 *
 * Ids follow the API's conventions: prescriptions by PublicId; pets,
 * products, branches and health records by their id as a string; users and
 * routes of administration by their numeric id.
 */

/** `RecetaDetalle.Unidad`: the code on the wire, without accents. */
export type PrescriptionDoseUnit =
  | 'ml'
  | 'tableta'
  | 'capsula'
  | 'mg'
  | 'gota'
  | 'aplicacion'
  | 'sobre'
  | 'pieza';

export const PRESCRIPTION_DOSE_UNITS: readonly PrescriptionDoseUnit[] = [
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
export const PRESCRIPTION_DOSE_UNIT_LABELS: Record<PrescriptionDoseUnit, string> = {
  ml: 'ml',
  tableta: 'tableta',
  capsula: 'cápsula',
  mg: 'mg',
  gota: 'gota',
  aplicacion: 'aplicación',
  sobre: 'sobre',
  pieza: 'pieza',
};

export type PrescriptionStatus = 'issued' | 'annulled';

/**
 * One medicine of a prescription, in print order. `dose` and `doseUnit` go
 * together; without a dose, `instructions` is required.
 */
export interface PrescriptionLine {
  /** Clinic product, or `null` when the medicine was typed by hand. */
  productId: string | null;
  /** Medicine as printed. */
  name: string;
  activeIngredient: string | null;
  dose: number | null;
  doseUnit: PrescriptionDoseUnit | null;
  /** `AdministrationRoute.id`. */
  routeId: number | null;
  /** Read only: the route's name and printed abbreviation («Oral», «VO»). */
  routeName?: string | null;
  routeAbbreviation?: string | null;
  /** 1..168. */
  everyHours: number | null;
  /** 1..365. */
  durationDays: number | null;
  instructions: string | null;
  /** `DoseReference.id` the line was proposed from, when it was. */
  doseReferenceId?: string | null;
  /** Clinical catalog version of that reference. */
  catalogVersion?: number | null;
  /** `true` when the vet changed the proposed dose or unit. */
  doseModified?: boolean;
}

/**
 * A prescription the clinic issued. `data` is the snapshot of what was
 * printed (letterhead, vet, licence, pet, owner), so a reprint is identical;
 * only on GET one and on the POST that issues it.
 */
export interface Prescription {
  /** Public GUID. */
  id: string;
  folio: string;
  petId: string;
  /** The consultation where it was issued. */
  recordId: string | null;
  branchId: string | null;
  /** ISO 8601 UTC. */
  date: string;
  vetUserId: number;
  vetName: string | null;
  lines: PrescriptionLine[];
  generalInstructions: string | null;
  status: PrescriptionStatus;
  annulReason: string | null;
  /** ISO 8601 UTC. */
  annulDate: string | null;
  data?: Record<string, unknown>;
}

/** Body of POST /veterinarian/pets/{petId}/prescriptions. */
export interface IssuePrescriptionRequest {
  recordId?: string | null;
  /** Defaults to the branch of the session. */
  branchId?: string | null;
  vetUserId: number;
  lines: PrescriptionLine[];
  generalInstructions?: string | null;
  data: Record<string, unknown>;
}

/** Body of POST /veterinarian/prescriptions/{id}/annul. */
export interface AnnulPrescriptionRequest {
  reason: string;
}
