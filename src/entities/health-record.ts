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
  batch?: string | null;
  /** Expiry of the applied vial, not a booster date. */
  validUntil?: string | null;
  route?: string | null;
  dose?: string | null;
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
  notes?: string | null;
  professionalUserId?: number | null;
}

/**
 * Body of PUT /pets/:petId/applications/:id. Product, date and professional keep their
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
  notes?: string | null;
  professionalUserId?: number | null;
}

/** Body of PUT /pets/:petId/applications/:id/record: `null` unlinks the application. */
export interface LinkHealthApplicationRequest {
  recordId: number | string | null;
}
