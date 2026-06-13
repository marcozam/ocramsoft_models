"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentStatus = void 0;
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
//# sourceMappingURL=appointment.js.map