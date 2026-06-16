"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingChannel = exports.AppointmentStatus = void 0;
/**
 * Appointment lifecycle statuses.
 * Values match the SysMD CatStatus rows seeded under IDUso = 403 (AGENDA),
 * so the numeric value is the database status id.
 */
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus[AppointmentStatus["SCHEDULED"] = 40301] = "SCHEDULED";
    AppointmentStatus[AppointmentStatus["CONFIRMED"] = 40302] = "CONFIRMED";
    AppointmentStatus[AppointmentStatus["IN_PROGRESS"] = 40303] = "IN_PROGRESS";
    AppointmentStatus[AppointmentStatus["COMPLETED"] = 40304] = "COMPLETED";
    AppointmentStatus[AppointmentStatus["CANCELLED"] = 40305] = "CANCELLED";
    AppointmentStatus[AppointmentStatus["NO_SHOW"] = 40306] = "NO_SHOW";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
/**
 * How an appointment was booked. Drives auditing and the booking authority used:
 * a customer booking their own slot, a staff member booking for a customer, or an
 * external system booking through the public API.
 * Values match the SysMD CatCanalAgenda catalog ids.
 */
var BookingChannel;
(function (BookingChannel) {
    /** The customer booked their own appointment (self-service portal). */
    BookingChannel[BookingChannel["SELF_SERVICE"] = 1] = "SELF_SERVICE";
    /** A staff member (receptionist/admin) booked on behalf of a customer. */
    BookingChannel[BookingChannel["ON_BEHALF"] = 2] = "ON_BEHALF";
    /** An external system booked through the public API (API-key authenticated). */
    BookingChannel[BookingChannel["API"] = 3] = "API";
})(BookingChannel || (exports.BookingChannel = BookingChannel = {}));
//# sourceMappingURL=appointment.js.map