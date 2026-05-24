"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = isValidEmail;
exports.isValidPhone = isValidPhone;
exports.isValidMexicanRFC = isValidMexicanRFC;
exports.normalizeRFC = normalizeRFC;
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
    return phoneRegex.test(phone.trim());
}
function isValidMexicanRFC(rfc) {
    const clean = rfc.trim().toUpperCase();
    const personaFisica = /^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$/;
    const personaMoral = /^[A-Z]{3}[0-9]{6}[A-Z0-9]{3}$/;
    return personaFisica.test(clean) || personaMoral.test(clean);
}
function normalizeRFC(rfc) {
    return rfc.trim().toUpperCase();
}
//# sourceMappingURL=validation.utils.js.map