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
   * groomer, a stylist or a table). `null` / absent = the branch's main agenda (the consulting
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

/**
 * What an agenda other than the branch's main one is for. It only groups
 * agendas on screen; it does not decide which services an agenda offers.
 */
export enum AppointmentResourceKind {
  /** An agenda of no particular trade. */
  GENERAL = 'general',
  /** A consulting agenda (a vet or a consulting room). */
  CONSULTATION = 'consultation',
  /** The grooming service: a groomer (estilista) or a grooming table. */
  GROOMING = 'grooming',
  /** A beauty salon: a stylist or a chair. */
  STYLING = 'styling',
}

/** Whether a person or a place works an agenda. */
export enum AppointmentResourceClass {
  /** A professional: worked by a system user. */
  PROFESSIONAL = 'professional',
  /** A space or equipment (a table, a room, a chair): no user. */
  SPACE = 'space',
}

/**
 * A bookable agenda of a branch besides its main one, such as a groomer, a
 * stylist or a grooming table: it takes one appointment at a time,
 * independent of every other agenda.
 */
export interface AppointmentResource {
  id: number;
  branchId: number;
  kind: AppointmentResourceKind;
  resourceClass: AppointmentResourceClass;
  name: string;
  isActive: boolean;
  /** Display order among the branch's agendas of the same kind (ascending). */
  order: number;
  /**
   * A professional agenda is worked by a system user (its PublicId). `null`
   * = not linked yet, which only legacy agendas are; always `null` for a space.
   */
  userPublicId?: string | null;
  /** Name of the user working the agenda; `null` when there is none. */
  userName?: string | null;
}

/**
 * One opening range of an agenda's week. A day may have several ranges (a
 * lunch break splits it); they never overlap and each lies inside the
 * branch hours of that day. An agenda with no ranges follows the branch hours.
 */
export interface ResourceWorkingHours {
  /** ISO weekday: 1 = Monday .. 7 = Sunday. */
  dayOfWeek: number;
  /** Branch-local opening time, `HH:mm`. */
  opensAt: string;
  /** Branch-local closing time, `HH:mm`, after `opensAt`. */
  closesAt: string;
  /** Slot interval of the range in minutes; absent = 30. */
  intervalMinutes?: number;
}

/** Body of PUT /appointments/resources/{id}/hours: the whole week; `[]` = follow the branch hours. */
export interface SetResourceWorkingHoursRequest {
  hours: ResourceWorkingHours[];
}

/**
 * A span no appointment may be offered in or self-booked into (lunch, a day
 * off, a holiday). Staff may still book over it.
 */
export interface AgendaBlock {
  id: number;
  branchId: number;
  /** The agenda it blocks; `null` = the whole branch (every agenda). */
  resourceId: number | null;
  resourceName?: string | null;
  /** ISO 8601 start instant (UTC). */
  start: string;
  /** ISO 8601 end instant (UTC), after `start`. */
  end: string;
  reason?: string | null;
  isActive: boolean;
  /** Local id of the user who created it. */
  createdByUserId?: number | null;
  /** ISO 8601 creation instant (UTC). */
  registeredAt?: string;
}

/** Body of POST /appointments/blocks. */
export interface CreateAgendaBlockRequest {
  branchId: number;
  /** Absent / `null` = the whole branch. */
  resourceId?: number | null;
  /** ISO 8601 start instant. */
  start: string;
  /** ISO 8601 end instant, after `start`. */
  end: string;
  reason?: string | null;
}
