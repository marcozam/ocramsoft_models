/**
 * Veterinary vertical — appointment↔pet links (CitaXMascotas).
 *
 * The generic scheduling domain (`appointment.ts`) is business-agnostic: this
 * platform is whitelabel and an appointment never embeds pet data. Vet
 * screens attach and read pets through the dedicated /veterinarian endpoints,
 * which speak in these types.
 */

/** A pet attending an appointment, keyed by the staff-facing internal ids. */
export interface AppointmentPetLink {
  appointmentId: number;
  petId: number;
  petName: string;
  speciesName?: string;
}

/** A consultation started from an appointment, one per attending pet at most. */
export interface AppointmentRecordLink {
  appointmentId: number;
  petId: number;
  recordId: string;
}

/**
 * A consultation started without an appointment (walk-in), listed in the vet
 * day agenda next to that day's appointments. It stores no branch, so every
 * branch lists it.
 */
export interface WalkInVisit {
  recordId: string;
  /** UTC instant of the consultation. */
  date: string;
  recordTypeId: number;
  recordTypeName: string;
  reason?: string;
  petId: number;
  petName: string;
  speciesName?: string;
  /** Main owner of the pet; absent when the pet has none. */
  ownerPersonId?: number;
  ownerName?: string;
  /** The owner's customer GUID, which the vet home loads the owner by. */
  ownerContactPublicId?: string;
  professionalName?: string;
}
