/**
 * Whether a vet service (consultation, applied product, complementary test)
 * has been charged: linked to the sale line that charged it, waived, or still
 * pending. Only services dated on or after the account's start date are
 * tracked; older ones have no charge entry at all.
 */

/** What kind of service a charge entry is about. */
export enum ChargedServiceKind {
  /** A consultation (health record), charged with its record type's product. */
  Consultation = 'consultation',
  /** A vaccine, rabies vaccine or dewormer applied (health application). */
  Application = 'application',
  /** A complementary test (medical test), charged with its configured product. */
  Test = 'test',
}

/**
 * - `charged`: linked to a sale that is not cancelled.
 * - `waived`: marked «Sin cargo» with a reason.
 * - `pending`: neither; a cancelled sale sends its services back here.
 */
export type ServiceChargeStatus = 'charged' | 'waived' | 'pending';

/**
 * A service a sale line charges (`SaleOrderItem.sources`). `id` is the id the
 * API already exposes for that service: `HealthRecord.id`,
 * `HealthRecordApplication.id` or `MedicalTest.id`.
 */
export interface ChargedServiceRef {
  kind: ChargedServiceKind;
  id: string;
}

/** Charge state of one tracked service of a pet. */
export interface ServiceChargeEntry extends ChargedServiceRef {
  /** Pet (PublicId). */
  petId: string;
  petName?: string;
  /** When the service was given (ISO instant). */
  date: string | null;
  /** Consultation type, applied product or test type, as the clinic sees it. */
  description: string;
  /**
   * Product the service is charged with. `null` = nothing to charge it with
   * yet (a consultation type or test type with no product configured).
   */
  productId: string | null;
  productName?: string | null;
  /** Units of the product it takes: the applied quantity, 1 otherwise. */
  quantity: number;
  status: ServiceChargeStatus;
  /** `charged`: the sale (PublicId) and its folio. */
  saleId?: string | null;
  saleFolioNumber?: number | null;
  /** `charged`: the sale still owes money (total above what was paid). */
  saleHasBalance?: boolean;
  /** `waived`: why it is not charged. */
  waivedReason?: string | null;
  /** Applications: the lot applied, so the counter sells from it. */
  lotId?: string | null;
  lotCode?: string | null;
  /** Applications: expiry of the applied vial (`YYYY-MM-DD`). */
  lotExpirationDate?: string | null;
}

/** Body of POST /veterinarian/charges/waive (elevated roles). */
export interface WaiveServiceChargeRequest extends ChargedServiceRef {
  /** Required, trimmed, up to 200 characters. */
  reason: string;
}
