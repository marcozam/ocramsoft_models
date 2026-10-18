import type { MedicalTestFileKind, MedicalTestValue, MedicalTestValueInput } from './medical-test';
/**
 * Veterinary vertical — the clinical file (expediente) of a patient.
 *
 * A consultation (`HealthRecord`) is the clinical note of a visit. Sanitary
 * applications (vaccines, dewormers) and medical tests belong to the patient
 * and link to a consultation only optionally: most vaccines are applied
 * without one. Served under /veterinarian.
 */
/** A health-record type from the catalog (Consulta General, Seguimiento...). */
export interface HealthRecordType {
    id: number;
    name: string;
    /**
     * Product the vet POS charges for a consultation of this type («Cobrar»)
     * for the caller's account; `null` when the type is not charged.
     */
    productId?: string | null;
    productName?: string | null;
    /** Agenda default for a visit of this type (minutes); `null` when the account set none. */
    durationMinutes?: number | null;
}
/**
 * Body of PUT /veterinarian/record-types/:id/product. When the account has
 * consultation categories (`config/veterinary`), the product must belong to
 * one; `null` clears it. Same per-account setting as `VisitTypeSetting.productId`.
 */
export interface SetHealthRecordTypeProductRequest {
    productId: number | null;
}
/** A consultation: the dated clinical note of a visit. */
export interface HealthRecord {
    id: string;
    patientId: string;
    recordTypeId: number;
    recordType?: string;
    date: string | null;
    reason?: string | null;
    diagnosis?: string | null;
    treatment?: string | null;
    notes?: string | null;
    professionalUserId?: number | null;
    /** The appointment the consultation was started from, if any. */
    appointmentId?: string | null;
    /** When the complaint began (`yyyy-MM-dd`), as the tutor reports it. */
    onsetDate?: string | null;
    /** Diagnosis confirmed after the studies; `diagnosis` holds the presumptive one. */
    finalDiagnosis?: string | null;
    /** Active files (photos, PDFs) attached to the consultation. */
    filesCount?: number;
    /**
     * The consultation's captured attributes (vital signs and any extra ones its
     * type asks for), in the type's order.
     */
    vitals?: MedicalTestValue[];
    isActive: boolean;
}
/** Body of POST /pets/:petId/records; PUT /records/:id takes it partially. */
export interface CreateHealthRecordRequest {
    recordTypeId: number;
    date?: string;
    reason?: string;
    diagnosis?: string;
    treatment?: string;
    notes?: string;
    professionalUserId?: number;
    /**
     * `yyyy-MM-dd`. On update, omitted keeps it and `null` clears it (the
     * same rule applies to `finalDiagnosis`).
     */
    onsetDate?: string | null;
    finalDiagnosis?: string | null;
    /**
     * Start the consultation from this appointment (create only): the pet must
     * attend it, and each pet gets at most one consultation per appointment.
     */
    appointmentId?: string;
    /**
     * Values of the attributes linked to the consultation type. Each entry is
     * upserted; `value: null` clears it; attributes left out are untouched.
     */
    vitals?: MedicalTestValueInput[];
}
/**
 * One attribute a clinic captures in a consultation type
 * (PUT /veterinarian/record-types/:typeId/attributes).
 */
export interface RecordTypeAttributeSetting {
    /** A health attribute (GET /veterinarian/health-attributes). */
    attributeId: number;
    /** Capture order (integer >= 0); omitted = its position in the list, from 1. */
    order?: number;
    /**
     * Section header (max 100 characters); `''` = none; omitted or `null` keeps
     * the one it had (or, for a new attribute, the platform default of the type).
     */
    section?: string | null;
}
/**
 * Body of PUT /veterinarian/record-types/:typeId/attributes: the complete list
 * of attributes the clinic captures in the type (it replaces the previous one;
 * `[]` captures nothing). Values already captured keep reading back.
 */
export interface SetRecordTypeAttributesRequest {
    attributes: RecordTypeAttributeSetting[];
}
/**
 * A file attached to a consultation (clinical photo, external report). Files
 * are private: the bytes are only served by
 * GET /veterinarian/records/{recordId}/files/{id}/content to an authenticated
 * user, never through a public URL.
 */
export interface HealthRecordFile {
    /** Public GUID of the file. */
    id: string;
    recordId: string;
    fileName: string;
    contentType: string;
    kind: MedicalTestFileKind;
    /** Size in bytes. */
    size: number;
    uploadedAt: string | null;
    /** Caption (up to 200 characters), e.g. the lesion the photo shows. */
    description?: string | null;
}
/**
 * Body of PATCH /veterinarian/records/{recordId}/files/{fileId}: `null` or
 * `''` clears the caption.
 */
export interface UpdateHealthRecordFileRequest {
    description: string | null;
}
/** One consultation's captured attributes in a pet's history (GET /veterinarian/pets/:petId/vitals). */
export interface PetVitalsEntry {
    healthRecordId: string;
    date: string;
    values: MedicalTestValue[];
}
/**
 * What an applied product is, fixed when it is applied. `rabies` is a vaccine
 * the travel certificate asks for by name.
 */
export type HealthApplicationKind = 'vaccine' | 'rabies' | 'dewormer';
/** A sanitary product applied to a patient. */
export interface HealthRecordApplication {
    id: string;
    /** Consultation it was applied in; `null` = applied outside a consultation. */
    recordId: string | null;
    /** Date of application. */
    date: string | null;
    /** `null` when the product's category is not classified in `config/veterinary`. */
    kind: HealthApplicationKind | null;
    productId: string;
    product?: string;
    categoryId: number;
    category?: string;
    /** Product brand — the laboratory the airline asks for. */
    brand?: string | null;
    /** The product's principal photo; `null` when it has none. */
    productImageUrl?: string | null;
    batch?: string | null;
    /** Expiry of the applied vial, not a booster date. */
    validUntil?: string | null;
    route?: string | null;
    dose?: string | null;
    /** Doses of the product applied (what the visit charges); 1 when absent. */
    quantity?: number;
    notes?: string | null;
    professionalUserId?: number | null;
    isActive: boolean;
}
/**
 * Body of POST /pets/:petId/applications. `recordId` links it to a
 * consultation of the same pet; omitted, the application stands alone.
 * POST /records/:recordId/applications takes the same body minus `recordId`
 * (the date defaults to the consultation's).
 */
export interface CreateHealthApplicationRequest {
    productId: number;
    recordId?: number | string | null;
    /** Defaults to now; back-dating is allowed. */
    date?: string;
    batch?: string | null;
    validUntil?: string | null;
    route?: string | null;
    dose?: string | null;
    /** Doses applied, a positive integer; defaults to 1. */
    quantity?: number;
    notes?: string | null;
    professionalUserId?: number | null;
}
/**
 * Body of PUT /pets/:petId/applications/:id. Product, date, quantity and professional keep their
 * value when omitted; the vial fields (batch, validUntil, route, dose, notes)
 * are replaced as sent, so omitting one clears it.
 */
export interface UpdateHealthApplicationRequest {
    productId?: number;
    date?: string;
    batch?: string | null;
    validUntil?: string | null;
    route?: string | null;
    dose?: string | null;
    quantity?: number;
    notes?: string | null;
    professionalUserId?: number | null;
}
/** Body of PUT /pets/:petId/applications/:id/record: `null` unlinks the application. */
export interface LinkHealthApplicationRequest {
    recordId: number | string | null;
}
//# sourceMappingURL=health-record.d.ts.map