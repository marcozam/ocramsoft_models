import { BaseEntity } from '../core/base-entity';

/**
 * Appointment lifecycle statuses.
 * Values match the SysMD CatStatus rows seeded under IDUso = 403 (AGENDA),
 * so the numeric value is the database status id.
 */
export enum AppointmentStatus {
  SCHEDULED = 40301,
  CONFIRMED = 40302,
  IN_PROGRESS = 40303,
  COMPLETED = 40304,
  CANCELLED = 40305,
  NO_SHOW = 40306,
}

/**
 * How an appointment was booked. Drives auditing and the booking authority used:
 * a customer booking their own slot, a staff member booking for a customer, or an
 * external system booking through the public API.
 * Values match the SysMD CatCanalAgenda catalog ids.
 */
export enum BookingChannel {
  /** The customer booked their own appointment (self-service portal). */
  SELF_SERVICE = 1,
  /** A staff member (receptionist/admin) booked on behalf of a customer. */
  ON_BEHALF = 2,
  /** An external system booked through the public API (API-key authenticated). */
  API = 3,
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
  /** The customer's frontend-safe GUID (Contacto.PublicId); use it to load the customer. */
  customerPublicId?: string;
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
   * The agenda the appointment is booked on (`AppointmentResource`, e.g. a
   * groomer). `null` / absent = the branch's main agenda (the consulting
   * room). Overlaps are checked per agenda: two appointments only collide
   * when they share it.
   */
  resourceId?: number | null;
  resourceName?: string | null;
  /**
   * Vet vertical: the clinical case a follow-up appointment was born from
   * (internal id), with its public GUID and title; absent for any other
   * appointment. The consultation started from the appointment inherits it.
   */
  caseId?: string | null;
  casePublicId?: string | null;
  caseTitle?: string | null;
}

/** A candidate booking slot returned by the availability endpoint. */
export interface AppointmentSlot {
  /** ISO 8601 start datetime. */
  start: string;
  /** ISO 8601 end datetime. */
  end: string;
  available: boolean;
  /** The agenda the slot was checked against; absent = the branch's main agenda. */
  resourceId?: number | null;
}

/** What an agenda other than the branch's main one is for. */
export enum AppointmentResourceKind {
  /** A groomer (estilista) of the grooming service. */
  GROOMING = 'grooming',
}

/**
 * A bookable agenda of a branch besides its main one, such as a groomer:
 * it takes one appointment at a time, independent of every other agenda.
 */
export interface AppointmentResource {
  id: number;
  branchId: number;
  kind: AppointmentResourceKind;
  name: string;
  isActive: boolean;
  /** Display order among the branch's agendas of the same kind (ascending). */
  order: number;
}
