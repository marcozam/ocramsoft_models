import { AppointmentSlot, AppointmentStatus } from './appointment';

/**
 * Customer self-service booking flow (public storefront).
 *
 * Identity comes from the generic customer-auth flow (`customer-auth.ts`):
 * a WhatsApp-OTP-verified phone and its short-lived customer token authorize
 * every call here. Internal integer ids never appear — appointments are
 * addressed by their PublicId GUID.
 */

/** Open slots for one day of the availability week view. */
export interface BookingAvailabilityDay {
  /** Calendar date, YYYY-MM-DD (branch-local). */
  date: string;
  /** Open slots only — booked or past slots are never included. */
  slots: AppointmentSlot[];
}

/** Response body for GET /booking/availability. */
export interface BookingAvailabilityWeek {
  /** First day of the returned window, YYYY-MM-DD (branch-local). */
  weekStart: string;
  /** Appointment duration (minutes) the slots were computed for. */
  durationMinutes: number;
  days: BookingAvailabilityDay[];
}

/**
 * A customer's own appointment as seen in the self-service flow.
 * `id` is the appointment PublicId GUID.
 */
export interface BookingAppointment {
  id: string;
  branchName?: string;
  /** ISO 8601 start datetime. */
  start: string;
  /** ISO 8601 end datetime. */
  end: string;
  durationMinutes: number;
  status: AppointmentStatus;
  statusName?: string;
  reason?: string;
}

/** Request body for POST /booking/appointments. */
export interface CreateBookingRequest {
  /** Slot start exactly as returned by the availability endpoint. */
  start: string;
  /** Free-text reason for the visit (e.g. the pet and symptom). */
  reason?: string;
}

/** Request body for PUT /booking/appointments/:id/reschedule. */
export interface RescheduleBookingRequest {
  /** New slot start exactly as returned by the availability endpoint. */
  start: string;
}
