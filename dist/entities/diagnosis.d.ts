/**
 * Diagnosis catalog: global clinical diagnoses (same for every clinic,
 * versioned with the clinical catalog) and the ones a consultation records.
 */
export type DiagnosisKind = 'presumptive' | 'definitive';
/** A catalog diagnosis, as returned by the search. */
export interface Diagnosis {
    id: string;
    key: string;
    name: string;
    /** `null` = any species. */
    speciesId: string | null;
    speciesName: string | null;
    /** Health-record type of the specialty (e.g. dermatology consultation); `null` = general. */
    recordTypeId: string | null;
    specialty: string | null;
    /** The synonym that matched the search, when the name did not. */
    matchedSynonym: string | null;
}
/** A catalog diagnosis recorded on a consultation. */
export interface RecordDiagnosis {
    id: string;
    diagnosisId: string;
    key: string;
    name: string;
    kind: DiagnosisKind;
    notes: string | null;
    /** ISO 8601 UTC. */
    createdAt: string;
}
/** Body item of `PUT /veterinarian/records/:recordId/diagnoses`. */
export interface RecordDiagnosisInput {
    diagnosisId: string;
    kind: DiagnosisKind;
    notes?: string | null;
}
//# sourceMappingURL=diagnosis.d.ts.map