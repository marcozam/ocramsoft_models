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
  notes?: string;
  createdByUserId?: number;
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
