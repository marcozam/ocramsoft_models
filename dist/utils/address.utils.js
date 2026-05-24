"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAddress = formatAddress;
exports.normalizeAddress = normalizeAddress;
exports.getCountryCodeFromName = getCountryCodeFromName;
exports.areAddressesSimilar = areAddressesSimilar;
const address_1 = require("../entities/address");
const COUNTRY_CODE_BY_NAME = {
    'united states': address_1.CountryCodes.US,
    usa: address_1.CountryCodes.US,
    us: address_1.CountryCodes.US,
    canada: address_1.CountryCodes.CA,
    mexico: address_1.CountryCodes.MX,
    spain: address_1.CountryCodes.ES,
    'espana': address_1.CountryCodes.ES,
    brasil: address_1.CountryCodes.BR,
    brazil: address_1.CountryCodes.BR,
    argentina: address_1.CountryCodes.AR,
    colombia: address_1.CountryCodes.CO,
    chile: address_1.CountryCodes.CL,
};
function formatAddress(address) {
    if (!address) {
        return '';
    }
    const streetParts = [];
    if (address.street) {
        streetParts.push(address.street);
    }
    if (address.extNumber !== undefined &&
        address.extNumber !== null &&
        `${address.extNumber}`.trim() !== '') {
        streetParts.push(`#${address.extNumber}`);
    }
    if (address.intNumber !== undefined &&
        address.intNumber !== null &&
        `${address.intNumber}`.trim() !== '') {
        streetParts.push(`INT ${address.intNumber}`);
    }
    const addressParts = [];
    if (streetParts.length > 0) {
        addressParts.push(streetParts.join(' '));
    }
    if (address.neighborhood) {
        addressParts.push(`COL. ${address.neighborhood}`);
    }
    return addressParts.join(' ').trim();
}
function normalizeAddress(address) {
    return {
        ...address,
        street: capitalizeWords(address.street.trim()),
        city: capitalizeWords(address.city.trim()),
        state: capitalizeWords(address.state.trim()),
        country: capitalizeWords(address.country.trim()),
        postalCode: address.postalCode?.trim().toUpperCase() ?? address.postalCode,
        neighborhood: address.neighborhood
            ? capitalizeWords(address.neighborhood.trim())
            : address.neighborhood,
        municipality: address.municipality
            ? capitalizeWords(address.municipality.trim())
            : address.municipality,
    };
}
function getCountryCodeFromName(countryName) {
    const normalizedName = countryName.trim().toLowerCase();
    return COUNTRY_CODE_BY_NAME[normalizedName] ?? null;
}
function areAddressesSimilar(address1, address2, threshold = 0.8) {
    const normalized1 = normalizeAddress(address1);
    const normalized2 = normalizeAddress(address2);
    const streetSimilarity = stringSimilarity(normalized1.street, normalized2.street);
    const citySimilarity = stringSimilarity(normalized1.city, normalized2.city);
    const stateSimilarity = stringSimilarity(normalized1.state, normalized2.state);
    const zipSimilarity = normalized1.postalCode === normalized2.postalCode ? 1 : 0;
    const countrySimilarity = stringSimilarity(normalized1.country, normalized2.country);
    const overallSimilarity = (streetSimilarity + citySimilarity + stateSimilarity + zipSimilarity + countrySimilarity) /
        5;
    return overallSimilarity >= threshold;
}
function capitalizeWords(value) {
    return value.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}
function stringSimilarity(value1, value2) {
    const longer = value1.length > value2.length ? value1 : value2;
    const shorter = value1.length > value2.length ? value2 : value1;
    if (longer.length === 0) {
        return 1;
    }
    const distance = levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
}
function levenshteinDistance(value1, value2) {
    const matrix = [];
    for (let i = 0; i <= value2.length; i += 1) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= value1.length; j += 1) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= value2.length; i += 1) {
        for (let j = 1; j <= value1.length; j += 1) {
            if (value2.charAt(i - 1) === value1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            }
            else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
            }
        }
    }
    return matrix[value2.length][value1.length];
}
//# sourceMappingURL=address.utils.js.map