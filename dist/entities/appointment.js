"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentStatus = void 0;
/**
 * Appointment lifecycle statuses.
 * Values match the SysMD CatStatus rows seeded under IDUso = 404 (AGENDA),
 * so the numeric value is the database status id.
 */
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus[AppointmentStatus["SCHEDULED"] = 40401] = "SCHEDULED";
    AppointmentStatus[AppointmentStatus["CONFIRMED"] = 40402] = "CONFIRMED";
    AppointmentStatus[AppointmentStatus["IN_PROGRESS"] = 40403] = "IN_PROGRESS";
    AppointmentStatus[AppointmentStatus["COMPLETED"] = 40404] = "COMPLETED";
    AppointmentStatus[AppointmentStatus["CANCELLED"] = 40405] = "CANCELLED";
    AppointmentStatus[AppointmentStatus["NO_SHOW"] = 40406] = "NO_SHOW";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
//# sourceMappingURL=appointment.js.map