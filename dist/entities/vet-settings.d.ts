/**
 * Vet catalog settings types — per-account customization of visit types,
 * test types and species for multi-tenancy (§2.2, §4.2 of the plan).
 *
 * These back the `/veterinarian/settings/*` endpoints.
 */
/** A visit type with the clinic's per-account settings. */
export interface VisitTypeSetting {
    id: number;
    name: string;
    /**
     * `true` for platform-curated types (shared across clinics); `false` for
     * types created by this clinic (private, editable/deletable by the owner).
     */
    isGlobal: boolean;
    /** Whether this type is enabled for the clinic. */
    enabled: boolean;
    /** Display order within the clinic's list. */
    order: number;
    /** Product charged at the POS when a visit of this type is billed. */
    productId: string | null;
    /** Default appointment duration in minutes. */
    durationMinutes: number | null;
}
/**
 * Body of PUT /veterinarian/settings/visit-types/:id: the clinic's settings
 * for any visit type, plus `name` for a type the clinic owns.
 */
export interface UpdateVisitTypeSettingRequest {
    /** Only for clinic-private types; a global type cannot be renamed. */
    name?: string;
    enabled?: boolean;
    order?: number;
    productId?: string | null;
    durationMinutes?: number | null;
}
/** Body of POST /veterinarian/settings/visit-types (create a private type). */
export interface CreateVisitTypeRequest {
    name: string;
    enabled?: boolean;
    order?: number;
    productId?: string | null;
    durationMinutes?: number | null;
}
/** A test type with the clinic's per-account settings. */
export interface TestTypeSetting {
    id: number;
    name: string;
    /** Whether this test type is enabled for the clinic. */
    enabled: boolean;
    /** Display order within the clinic's list. */
    order: number;
    /** Product charged when the test is performed in-house. */
    internalProductId: string | null;
    /** Product charged when the sample is sent to an external lab. */
    externalProductId: string | null;
}
/** Body of PUT /veterinarian/settings/test-types/:id. */
export interface UpdateTestTypeSettingRequest {
    enabled?: boolean;
    order?: number;
    internalProductId?: string | null;
    externalProductId?: string | null;
}
/** A species with the clinic's per-account settings. */
export interface SpeciesSetting {
    id: number;
    name: string;
    /** Whether this species is enabled for the clinic. */
    enabled: boolean;
    /** Display order within the clinic's list. */
    order: number;
}
/** Body of PUT /veterinarian/settings/species/:id. */
export interface UpdateSpeciesSettingRequest {
    enabled?: boolean;
    order?: number;
}
/** An IANA time zone option for the branch form. */
export interface TimeZoneOption {
    id: number;
    /** IANA identifier, e.g. `America/Mexico_City`. */
    iana: string;
    /** User-facing label, e.g. `Hora del Centro`. */
    name: string;
}
//# sourceMappingURL=vet-settings.d.ts.map