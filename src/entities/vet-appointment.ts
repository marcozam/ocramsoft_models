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
