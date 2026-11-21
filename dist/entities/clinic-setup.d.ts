/**
 * «Arma tu clínica»: the questions that prefill a new clinic's catalogs
 * (GET/POST /veterinarian/settings/clinic-setup). Applying only adds what is
 * missing, matched by name: it never deletes a record nor changes a price
 * already set.
 */
export type ClinicKind = 'consultorio' | 'clinica' | 'especialidad' | 'hospital';
export type ClinicSpecialty = 'general' | 'dermatologia' | 'medicina-interna';
/** Where an item lands: each group is one product category of the clinic. */
export type ClinicSetupGroup = 'consultation' | 'internal-study' | 'external-study' | 'vaccine' | 'rabies-vaccine' | 'dewormer';
export interface ClinicSetupGroupTemplate {
    group: ClinicSetupGroup;
    /** Name of the category created for the group (matched by name). */
    categoryName: string;
    /** Stock tracked by lot and expiry (vaccines, dewormers). */
    lotControl: boolean;
    /** Products carry a duration in the agenda. */
    schedulable: boolean;
    icon: string;
}
export interface ClinicSetupTemplateItem {
    key: string;
    name: string;
    group: ClinicSetupGroup;
    specialty: ClinicSpecialty;
    /** Inventory unit shown next to the price («dosis», «tableta»); null for services. */
    unit: string | null;
    /** Suggested agenda duration; applied only when the clinic books appointments. */
    durationMinutes: number | null;
    /** Visit type (CatTiposRegistroSalud name) this product charges. */
    visitTypeName?: string;
    /** Test type (CatTiposEstudio name) this product charges. */
    testTypeName?: string;
    /** Clinic kinds that start with the item ticked. */
    preselectedFor: ClinicKind[];
}
export interface ClinicSpecialtyTemplate {
    id: ClinicSpecialty;
    name: string;
    description: string;
    /** `general` is always included. */
    required: boolean;
    visitTypeNames: string[];
    testTypeNames: string[];
    preselectedFor: ClinicKind[];
}
export interface ClinicKindTemplate {
    id: ClinicKind;
    name: string;
    description: string;
}
export interface ClinicSetupTemplate {
    version: number;
    kinds: ClinicKindTemplate[];
    specialties: ClinicSpecialtyTemplate[];
    groups: ClinicSetupGroupTemplate[];
    items: ClinicSetupTemplateItem[];
}
export interface ClinicSetupItemInput {
    /** Template key, absent for an item the clinic added. */
    key?: string | null;
    name: string;
    group: ClinicSetupGroup;
    /** Price with taxes, > 0. */
    price: number;
    durationMinutes?: number | null;
}
/** Body of POST /veterinarian/settings/clinic-setup. */
export interface ClinicSetupRequest {
    kind: ClinicKind;
    /** Branch whose price list gets the prices (CatSucursales.ID). */
    branchId: string;
    /** Renames that branch; absent keeps its name. */
    branchName?: string | null;
    /** Species the clinic attends; the others are disabled. At least one. */
    speciesIds: number[];
    specialties: ClinicSpecialty[];
    items: ClinicSetupItemInput[];
    /** Whether the clinic books appointments: items keep their durations. */
    appointments: boolean;
    /** Ask for a cash count (corte de caja) to sell. */
    cashSessions: boolean;
}
export type ClinicSetupStepId = 'branch' | 'species' | 'specialties' | 'categories' | 'products' | 'prices' | 'links' | 'veterinary-config' | 'features';
export interface ClinicSetupStepResult {
    step: ClinicSetupStepId;
    ok: boolean;
    /** Names of what the step created or turned on. */
    created: string[];
    /** Names that already existed and were left as they were. */
    kept: string[];
    message?: string;
}
export interface ClinicSetupResult {
    ok: boolean;
    steps: ClinicSetupStepResult[];
}
/** What «Primeros pasos» reads to tick the clinic's steps. */
export interface ClinicSetupFacts {
    /** The clinic has consultation and vaccine categories configured. */
    clinicConfigured: boolean;
    /** At least one professional with a license number (cédula). */
    hasLicensedProfessional: boolean;
}
//# sourceMappingURL=clinic-setup.d.ts.map