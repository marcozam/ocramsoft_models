import { BaseEntity } from '../core/base-entity';
/**
 * Appointment lifecycle statuses.
 * Values match the SysMD CatStatus rows seeded under IDUso = 403 (AGENDA),
 * so the numeric value is the database status id.
 */
export declare enum AppointmentStatus {
    SCHEDULED = 40301,
    CONFIRMED = 40302,
    IN_PROGRESS = 40303,
    COMPLETED = 40304,
    CANCELLED = 40305,
    NO_SHOW = 40306
}
/**
 * How an appointment was booked. Drives auditing and the booking authority used:
 * a customer booking their own slot, a staff member booking for a customer, or an
 * external system booking through the public API.
 * Values match the SysMD CatCanalAgenda catalog ids.
 */
export declare enum BookingChannel {
    /** The customer booked their own appointment (self-service portal). */
    SELF_SERVICE = 1,
    /** A staff member (receptionist/admin) booked on behalf of a customer. */
    ON_BEHALF = 2,
    /** An external system booked through the public API (API-key authenticated). */
    API = 3
}
/** A single service booked within an appointment. Duration is snapshotted at booking time. */
export interface AppointmentService {
    serviceId: number;
    serviceName?: string;
    durationMinutes: number;
}
/**
 * A customer appointment for one or more services at a branch.
 * The appointment blocks a contiguous span: end - start === durationMinutes,
 * where durationMinutes is the sum of the booked services' durations.
 */
export interface Appointment extends BaseEntity {
    /**
     * Frontend-safe GUID (Cita.PublicId). The customer self-service flow
     * addresses appointments exclusively by this id; the internal integer `id`
     * stays within staff-facing APIs.
     */
    publicId?: string;
    branchId: number;
    branchName?: string;
    customerId: number;
    customerName?: string;
    services: AppointmentService[];
    /** ISO 8601 start datetime. */
    start: string;
    /** ISO 8601 end datetime (start + durationMinutes). */
    end: string;
    /** Sum of services' durations in minutes. */
    durationMinutes: number;
    status: AppointmentStatus;
    statusName?: string;
    /**
     * Free-text reason for the visit, captured at booking time (Phase 1 manual
     * scheduler). Complements `services` — a booking may have either or both.
     */
    reason?: string;
    notes?: string;
    /** Id of the user (staff or customer principal) who created the booking. */
    createdByUserId?: number;
    /**
     * How the booking was made: self-service, staff-on-behalf, or external API.
     * Optional for backward compatibility with appointments booked before channels
     * were tracked.
     */
    bookingChannel?: BookingChannel;
    /** Identifier of the external API client, set only when bookingChannel === API. */
    bookedByApiClientId?: string;
    /**
     * Reserved for the future multi-resource model (staff/station per branch).
     * Unused while scheduling is one-appointment-at-a-time per branch.
     */
    resourceId?: number;
}
/** A candidate booking slot returned by the availability endpoint. */
export interface AppointmentSlot {
    /** ISO 8601 start datetime. */
    start: string;
    /** ISO 8601 end datetime. */
    end: string;
    available: boolean;
    /** Reserved for the future multi-resource model. */
    resourceId?: number;
}
//# sourceMappingURL=appointment.d.ts.map