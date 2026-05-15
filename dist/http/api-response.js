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
})(ResponseCode || (exports.ResponseCode = ResponseCode = {}));
//# sourceMappingURL=api-response.js.map