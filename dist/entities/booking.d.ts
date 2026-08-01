import { AppointmentSlot, AppointmentStatus } from './appointment';
/**
 * Customer self-service booking flow (public storefront).
 *
 * Identity is a phone number verified through a WhatsApp OTP: the customer
 * requests a code, verifies it, and receives a short-lived booking token that
 * scopes every subsequent call to that verified phone. Internal integer ids
 * never appear here — appointments are addressed by their PublicId GUID.
 */
/** Request body for POST /booking/otp/request. */
export interface BookingOtpRequest {
    /** Customer phone number in local digits (10-digit MX) — normalized server-side. */
    phone: string;
}
/** Request body for POST /booking/otp/verify. */
export interface BookingOtpVerifyRequest {
    phone: string;
    /** The 6-digit code received over WhatsApp. */
    code: string;
}
/**
 * The customer identity resolved after OTP verification.
 * When `exists` is false the frontend must ask for the customer's name before
 * booking; the account is created with the first booking.
 */
export interface BookingCustomer {
    exists: boolean;
    /** Display name, present only when the customer already exists. */
    name?: string;
}
/** Response body for POST /booking/otp/verify. */
export interface BookingOtpVerifyResponse {
    /** Bearer token scoping subsequent booking calls to the verified phone. */
    token: string;
    /** Token lifetime in seconds. */
    expiresIn: number;
    customer: BookingCustomer;
}
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
    /**
     * Customer display name. Required when the verified phone has no customer
     * yet (BookingCustomer.exists === false); ignored otherwise.
     */
    customerName?: string;
    /** Free-text reason for the visit (e.g. the pet and symptom). */
    reason?: string;
}
/** Request body for PUT /booking/appointments/:id/reschedule. */
export interface RescheduleBookingRequest {
    /** New slot start exactly as returned by the availability endpoint. */
    start: string;
}
//# sourceMappingURL=booking.d.ts.map