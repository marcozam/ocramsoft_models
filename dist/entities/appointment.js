"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentResourceClass = exports.AppointmentResourceKind = exports.BookingChannel = exports.AppointmentStatus = void 0;
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
/**
 * What an agenda other than the branch's main one is for. It only groups
 * agendas on screen; it does not decide which services an agenda offers.
 */
var AppointmentResourceKind;
(function (AppointmentResourceKind) {
    /** An agenda of no particular trade. */
    AppointmentResourceKind["GENERAL"] = "general";
    /** A consulting agenda (a vet or a consulting room). */
    AppointmentResourceKind["CONSULTATION"] = "consultation";
    /** The grooming service: a groomer (estilista) or a grooming table. */
    AppointmentResourceKind["GROOMING"] = "grooming";
    /** A beauty salon: a stylist or a chair. */
    AppointmentResourceKind["STYLING"] = "styling";
})(AppointmentResourceKind || (exports.AppointmentResourceKind = AppointmentResourceKind = {}));
/** Whether a person or a place works an agenda. */
var AppointmentResourceClass;
(function (AppointmentResourceClass) {
    /** A professional: worked by a system user. */
    AppointmentResourceClass["PROFESSIONAL"] = "professional";
    /** A space or equipment (a table, a room, a chair): no user. */
    AppointmentResourceClass["SPACE"] = "space";
})(AppointmentResourceClass || (exports.AppointmentResourceClass = AppointmentResourceClass = {}));
//# sourceMappingURL=appointment.js.map