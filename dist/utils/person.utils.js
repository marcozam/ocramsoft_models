"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeText = normalizeText;
exports.normalizeOptionalDate = normalizeOptionalDate;
exports.normalizeOptionalPositiveInt = normalizeOptionalPositiveInt;
exports.formatPersonFullName = formatPersonFullName;
function normalizeText(value) {
    return typeof value === 'string' ? value.trim() : '';
}
function normalizeOptionalDate(value) {
    if (!value) {
        return undefined;
    }
    const parsed = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}
function normalizeOptionalPositiveInt(value) {
    if (value === undefined || value === null || String(value).trim() === '') {
        return undefined;
    }
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) {
        throw new Error('Value must be a positive integer when provided');
    }
    return parsed;
}
function formatPersonFullName(person) {
    if (!person) {
        return '';
    }
    return [person.name, person.paternalSurname, person.maternalSurname]
        .filter((part) => typeof part === 'string' && part.trim().length > 0)
        .map((part) => String(part).trim())
        .join(' ');
}
//# sourceMappingURL=person.utils.js.map