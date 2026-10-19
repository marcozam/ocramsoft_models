/**
 * Veterinary vertical — medical tests (estudios clínicos).
 *
 * Each study type (e.g. Reporte Citológico) captures a set of attributes from
 * a global catalog; a study stores one value per attribute. Served under
 * /veterinarian/test-types and /veterinarian/tests.
 */

/**
 * How an attribute is captured. Maps the SQL `TipoDato`:
 * 1 numeric, 2 text, 3 boolean, 4 option, 5 multioption, 6 bodymap.
 */
export type TestAttributeDataType =
  | 'numeric'
  | 'text'
  | 'boolean'
  | 'option'
  | 'multioption'
  | 'bodymap';

/** Silhouette a body map is drawn on. */
export type BodyMapSilhouette = 'canine' | 'feline';

/** View of the silhouette a marker sits on. */
export type BodyMapView = 'lateral_left' | 'lateral_right' | 'dorsal' | 'ventral';

/** One lesion site marked on the body map; `x`/`y` are fractions (0..1) of the view. */
export interface BodyMapMarker {
  /** Stable within the value (max 40 chars). */
  id: string;
  view: BodyMapView;
  x: number;
  y: number;
  /** Lesion type, usually one of the lesion options of the visit (max 60 chars). */
  label?: string | null;
  /** Max 200 chars. */
  note?: string | null;
}

/**
 * Value of a `bodymap` attribute (stored as JSON text). At most 100 markers.
 */
export interface BodyMapValue {
  version: 1;
  silhouette: BodyMapSilhouette;
  markers: BodyMapMarker[];
}

/** A study type from the catalog; its attributes are fetched per type. */
export interface TestType {
  id: number;
  name: string;
  /** The type is configured for AI analysis of its photos. */
  aiAnalysis?: boolean;
  /**
   * Only when the list was requested for a visit type (`?recordTypeId=`):
   * the visit type suggests this study; suggested types come first.
   */
  suggested?: boolean;
  /** Position among the suggested types; `null` when not suggested. */
  suggestedOrder?: number | null;
}

/**
 * One capturable attribute of a study type or a consultation type, in order.
 * `refMin`/`refMax` are the normal range, resolved for the patient's species
 * when the catalog has one for it.
 */
export interface TestAttribute {
  attributeId: number;
  /** Stable code for attributes the apps look up by name (e.g. `peso`). */
  key?: string | null;
  name: string;
  dataType: TestAttributeDataType;
  unit: string | null;
  /** Decimal places a numeric value may have; `0` = whole numbers. */
  decimals?: number | null;
  /** Physically possible bounds: a numeric value outside them is rejected. */
  limitMin?: number | null;
  limitMax?: number | null;
  refMin: number | null;
  refMax: number | null;
  /** Valid choices for `option` / `multioption`; empty for other types. */
  options: string[];
  /** Report section header the attribute is printed under. */
  section: string | null;
  order: number;
  /** The apps chart this attribute over time (`CatAtributosSalud.Tendencia`). */
  trend?: boolean;
}

/** A captured value of one attribute within a study. */
export interface MedicalTestValue {
  attributeId: number;
  key?: string | null;
  attributeName: string;
  dataType: TestAttributeDataType;
  unit: string | null;
  section: string | null;
  numericValue: number | null;
  /** For `multioption`, the chosen labels joined with `|`; for `bodymap`, the raw JSON. */
  textValue: string | null;
  /** Set only when `dataType` is `bodymap`: `textValue` parsed. */
  bodyMapValue?: BodyMapValue | null;
  /** Set only when `dataType` is `boolean`. */
  boolValue: boolean | null;
  refMin: number | null;
  refMax: number | null;
  /** Numeric values only: the value falls outside a reference bound. */
  outOfRange: boolean;
  observation: string | null;
  /** The apps chart this attribute over time; sent in a pet's vitals history. */
  trend?: boolean;
  /**
   * Consultation values only: the value was prefilled from the previous visit
   * of the case and not touched (it is stored, but the pet sheet ignores it
   * and the case progress greys it out).
   */
  copied?: boolean;
}

/**
 * Who produces the results: `internal` — the vet captures them;
 * `external` — the sample goes to a laboratory and the results come back.
 */
export type MedicalTestOrigin = 'internal' | 'external';

/**
 * Where a study stands, derived by the gateway (never stored):
 * - `pending_results` — internal draft, results not captured yet.
 * - `to_send` — external draft whose sample has not been sent.
 * - `at_lab` — external draft, sample sent, results not back.
 * - `to_interpret` — external draft, results arrived, not interpreted.
 * - `completed` — not a draft.
 */
export type MedicalTestStatus =
  | 'pending_results'
  | 'to_send'
  | 'at_lab'
  | 'to_interpret'
  | 'completed';

/** A study performed on a patient, with its captured values. */
export interface MedicalTest {
  id: string;
  patientId: string;
  testTypeId: number;
  testTypeName?: string;
  /** Visit (expediente record) the study was ordered from, if any. */
  healthRecordId: string | null;
  date: string | null;
  notes: string | null;
  interpretation: string | null;
  suggestions: string | null;
  professionalUserId: number | null;
  isActive: boolean;
  /**
   * Started without results (type + photos, e.g. from the phone); the values
   * are captured later. A completed study never goes back to draft.
   */
  isDraft?: boolean;
  /** Active files (photos, PDFs) attached to the study. */
  fileCount?: number;
  /** Defaults to `internal` for studies created before origins existed. */
  origin?: MedicalTestOrigin;
  /**
   * What the study is charged as: the product configured for its study type
   * and origin (`config/veterinary`), fixed when the study is ordered.
   */
  productId?: string | null;
  productName?: string | null;
  /** External studies: the laboratory, a supplier (its public id). */
  laboratoryId?: string | null;
  laboratoryName?: string | null;
  /** External studies: when the sample was sent (ISO instant). */
  sentAt?: string | null;
  /** External studies: when the results are expected (`yyyy-MM-dd`). */
  expectedResultsAt?: string | null;
  /** External studies: when the results arrived (ISO instant). */
  resultsReceivedAt?: string | null;
  status?: MedicalTestStatus;
  values: MedicalTestValue[];
  /** Single-study reads only: results flagged as zoonotic or notifiable. */
  notifiableFindings?: NotifiableFinding[];
}

/**
 * A result of a study that matches the catalog of zoonotic / notifiable
 * findings (e.g. a skin scraping positive for Sarcoptes). The vet decides
 * whether to report it; the app only warns.
 */
export interface NotifiableFinding {
  attributeId: number;
  attributeName: string;
  /** The captured option that triggered the flag. */
  value: string;
  disease: string;
  /** Transmissible to people: warn the owner and use protection. */
  zoonosis: boolean;
  /** Reportable to the authority. */
  notifiable: boolean;
  /** e.g. `SENASICA`. */
  authority: string | null;
  note: string | null;
}

/** A study of the clinic's pending tray, with the pet and its primary tutor. */
export interface PendingMedicalTest extends MedicalTest {
  petId: string;
  petName: string;
  speciesName: string | null;
  tutorName: string | null;
  tutorPhone: string | null;
  /** External study whose expected results date has passed. */
  overdue: boolean;
}

/** How an attached study file is shown: an inline photo or a PDF document. */
export type MedicalTestFileKind = 'image' | 'pdf';

/**
 * A file attached to a study (microscope photo, lab PDF). Files are private:
 * the bytes are only served by GET /veterinarian/tests/{testId}/files/{id}/content
 * to an authenticated user, never through a public URL.
 */
export interface MedicalTestFile {
  /** Public GUID of the file. */
  id: string;
  testId: string;
  fileName: string;
  contentType: string;
  kind: MedicalTestFileKind;
  /** Size in bytes. */
  size: number;
  uploadedAt: string | null;
}

/**
 * A value as sent on create/update. The gateway routes it to the numeric or
 * text column from the attribute's `dataType`; `multioption` takes `string[]`.
 * On update, `null` clears a previously captured value.
 */
export interface MedicalTestValueInput {
  attributeId: number;
  value: number | string | boolean | string[] | BodyMapValue | null;
  observation?: string;
  /** Consultation values only: prefilled from the previous visit of the case and not touched. */
  copied?: boolean;
}

/** Request body for POST /veterinarian/pets/{petId}/tests. */
export interface CreateMedicalTestRequest {
  testTypeId: number;
  healthRecordId?: number | string;
  date?: string;
  notes?: string;
  interpretation?: string;
  suggestions?: string;
  professionalUserId?: number;
  /** Creates a draft: `values` may then be empty or omitted. */
  isDraft?: boolean;
  /** Required (non-empty) unless `isDraft`. */
  values?: MedicalTestValueInput[];
  /** Defaults to `internal`; the shipment fields only apply to `external`. */
  origin?: MedicalTestOrigin;
  /** Supplier public id of the laboratory. */
  laboratoryId?: string;
  sentAt?: string;
  /** `yyyy-MM-dd`. */
  expectedResultsAt?: string;
}

/**
 * Request body for PUT /veterinarian/tests/{testId}. The study type is
 * immutable. A header field left out is kept; `null` or `''` clears it. Each
 * value sent is upserted (or cleared when `null`); values not sent are kept.
 */
export interface UpdateMedicalTestRequest {
  date?: string;
  notes?: string | null;
  interpretation?: string | null;
  suggestions?: string | null;
  professionalUserId?: number;
  /**
   * `false` completes a draft (it must end up with at least one value);
   * `true` is only accepted while the study is still a draft.
   */
  isDraft?: boolean;
  values?: MedicalTestValueInput[];
  /**
   * Switching origin clears the shipment when it becomes `internal` and
   * re-prices the study with the product of the new origin.
   */
  origin?: MedicalTestOrigin;
  /** Supplier public id of the laboratory; `null` clears it. */
  laboratoryId?: string | null;
  /** `null` clears the sent and expected dates. */
  sentAt?: string | null;
  /** `yyyy-MM-dd`; cleared together with `sentAt`. */
  expectedResultsAt?: string;
  /** `null` clears it (results not back after all). */
  resultsReceivedAt?: string | null;
}

/** How sure the model is of one suggested value. */
export type MedicalTestAiConfidence = 'high' | 'medium' | 'low';

/**
 * A value the model suggests from the study's photos. `value` has the shape
 * `MedicalTestValueInput.value` takes for the attribute's `dataType`.
 */
export interface MedicalTestAiSuggestion {
  attributeId: number;
  value: number | string | boolean | string[];
  observation: string | null;
  confidence: MedicalTestAiConfidence;
}

/**
 * How the slide findings relate to the vet's presumptive diagnosis:
 * `apoya` (they support it), `parcial` (partly, or not enough to tell),
 * `no_apoya` (they point elsewhere).
 */
export type MedicalTestAiConcordance = 'apoya' | 'parcial' | 'no_apoya';

/**
 * Feedback on the consultation's presumptive diagnosis, produced in a second,
 * text-only step after the blind slide reading (which never sees the
 * diagnosis). Every statement cites slide findings; the vet decides.
 */
export interface MedicalTestAiDiagnosisReview {
  concordance: MedicalTestAiConcordance;
  /** Why, in Spanish, citing the findings of the reading. */
  rationale: string;
  /** Slide findings that do not fit the diagnosis. */
  contradictingFindings: string[];
  /** Changes to consider in the treatment or the plan. */
  suggestedChanges: string[];
  /** Complementary tests that would settle the doubt. */
  suggestedNextTests: string[];
  /** The study's visit belongs to a clinical case and its history was considered. */
  usedCaseHistory?: boolean;
}

/**
 * Answer of POST /veterinarian/tests/{testId}/ai-analysis. Nothing is saved:
 * the vet reviews the suggestions in the form and saves the study.
 */
export interface MedicalTestAiAnalysis {
  testId: string;
  suggestions: MedicalTestAiSuggestion[];
  interpretation: string | null;
  /** Clinical suggestions (the report's SUGERENCIAS block). */
  recommendations: string | null;
  /** What the model could not judge, or suggestions it gave that were dropped. */
  warnings: string[];
  /** Files the model looked at. */
  analyzedFileIds: string[];
  model: string;
  /**
   * Contrast of the reading with the presumptive diagnosis of the study's
   * consultation; `null` when the study has no consultation or it has no
   * presumptive diagnosis (a warning says so), or the step failed.
   */
  diagnosisReview: MedicalTestAiDiagnosisReview | null;
}
