"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCode = void 0;
var ResponseCode;
(function (ResponseCode) {
    ResponseCode[ResponseCode["EXISTING"] = 1001] = "EXISTING";
    ResponseCode[ResponseCode["EXISTING_SESSION_INVALID_BRANCH"] = 1002] = "EXISTING_SESSION_INVALID_BRANCH";
    ResponseCode[ResponseCode["CREATED"] = 2010] = "CREATED";
    ResponseCode[ResponseCode["NO_ACTIVE_ENTITY"] = 4000] = "NO_ACTIVE_ENTITY";
    ResponseCode[ResponseCode["NOT_FOUND"] = 4040] = "NOT_FOUND";
    ResponseCode[ResponseCode["FORBIDDEN"] = 4030] = "FORBIDDEN";
    ResponseCode[ResponseCode["UNAUTHORIZED"] = 4010] = "UNAUTHORIZED";
    ResponseCode[ResponseCode["CONFLICT"] = 4090] = "CONFLICT";
    /**
     * A dependency the request needs is not configured or not reachable — the
     * request is valid and nothing is broken on our side, so it must not read as
     * a 500. Used by integrations that are gated behind external provisioning.
     */
    ResponseCode[ResponseCode["SERVICE_UNAVAILABLE"] = 5030] = "SERVICE_UNAVAILABLE";
})(ResponseCode || (exports.ResponseCode = ResponseCode = {}));
//# sourceMappingURL=api-response.js.map