/**
 * Veterinary vertical — medical tests (estudios clínicos).
 *
 * Each study type (e.g. Reporte Citológico) captures a set of attributes from
 * a global catalog; a study stores one value per attribute. Served under
 * /veterinarian/test-types and /veterinarian/tests.
 */
/**
 * How an attribute is captured. Maps the SQL `TipoDato`:
 * 1 numeric, 2 text, 3 boolean, 4 option, 5 multioption.
 */
export type TestAttributeDataType = 'numeric' | 'text' | 'boolean' | 'option' | 'multioption';
/** A study type from the catalog; its attributes are fetched per type. */
export interface TestType {
    id: number;
    name: string;
    /** The type is configured for AI analysis of its photos. */
    aiAnalysis?: boolean;
}
/** One capturable attribute of a study type, in report order. */
export interface TestAttribute {
    attributeId: number;
    name: string;
    dataType: TestAttributeDataType;
    unit: string | null;
    refMin: number | null;
    refMax: number | null;
    /** Valid choices for `option` / `multioption`; empty for other types. */
    options: string[];
    /** Report section header the attribute is printed under. */
    section: string | null;
    order: number;
}
/** A captured value of one attribute within a study. */
export interface MedicalTestValue {
    attributeId: number;
    attributeName: string;
    dataType: TestAttributeDataType;
    unit: string | null;
    section: string | null;
    numericValue: number | null;
    /** For `multioption`, the chosen labels joined with `|`. */
    textValue: string | null;
    /** Set only when `dataType` is `boolean`. */
    boolValue: boolean | null;
    refMin: number | null;
    refMax: number | null;
    /** Numeric values only: the value falls outside a reference bound. */
    outOfRange: boolean;
    observation: string | null;
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
export type MedicalTestStatus = 'pending_results' | 'to_send' | 'at_lab' | 'to_interpret' | 'completed';
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
    /** External studies: free-text laboratory name. */
    laboratory?: string | null;
    /** External studies: when the sample was sent (ISO instant). */
    sentAt?: string | null;
    /** External studies: when the results are expected (`yyyy-MM-dd`). */
    expectedResultsAt?: string | null;
    /** External studies: when the results arrived (ISO instant). */
    resultsReceivedAt?: string | null;
    status?: MedicalTestStatus;
    values: MedicalTestValue[];
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
    value: number | string | boolean | string[] | null;
    observation?: string;
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
    laboratory?: string;
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
    /** Switching to `internal` clears the shipment fields. */
    origin?: MedicalTestOrigin;
    /** `null` or `''` clears it. */
    laboratory?: string | null;
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
}
//# sourceMappingURL=medical-test.d.ts.map