import { Address, CountryCodes } from '../entities/address';

export function validateZipCodeByCountry(zipCode: string, countryCode: CountryCodes): boolean {
  const patterns: { [key in CountryCodes]?: RegExp } = {
    [CountryCodes.US]: /^\d{5}(-\d{4})?$/,
    [CountryCodes.CA]: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
    [CountryCodes.ES]: /^\d{5}$/,
    [CountryCodes.MX]: /^\d{5}$/,
    [CountryCodes.BR]: /^\d{5}-\d{3}$/,
    [CountryCodes.AR]: /^[A-Z]\d{4}[A-Z]{3}$/,
  };

  const pattern = patterns[countryCode];
  return pattern ? pattern.test(zipCode.toUpperCase()) : true;
}

const COUNTRY_CODE_BY_NAME: Record<string, CountryCodes> = {
  'united states': CountryCodes.US,
  usa: CountryCodes.US,
  us: CountryCodes.US,
  canada: CountryCodes.CA,
  mexico: CountryCodes.MX,
  spain: CountryCodes.ES,
  'espana': CountryCodes.ES,
  brasil: CountryCodes.BR,
  brazil: CountryCodes.BR,
  argentina: CountryCodes.AR,
  colombia: CountryCodes.CO,
  chile: CountryCodes.CL,
};

export function formatAddress(address: Address | null | undefined): string {
  if (!address) {
    return '';
  }

  const streetParts: string[] = [];

  if (address.street) {
    streetParts.push(address.street);
  }

  if (
    address.extNumber !== undefined &&
    address.extNumber !== null &&
    `${address.extNumber}`.trim() !== ''
  ) {
    streetParts.push(`#${address.extNumber}`);
  }

  if (
    address.intNumber !== undefined &&
    address.intNumber !== null &&
    `${address.intNumber}`.trim() !== ''
  ) {
    streetParts.push(`INT ${address.intNumber}`);
  }

  const addressParts: string[] = [];

  if (streetParts.length > 0) {
    addressParts.push(streetParts.join(' '));
  }

  if (address.neighborhood) {
    addressParts.push(`COL. ${address.neighborhood}`);
  }

  return addressParts.join(' ').trim();
}

export function normalizeAddress(address: Address): Address {
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

export function getCountryCodeFromName(countryName: string): CountryCodes | null {
  const normalizedName = countryName.trim().toLowerCase();
  return COUNTRY_CODE_BY_NAME[normalizedName] ?? null;
}

export function areAddressesSimilar(
  address1: Address,
  address2: Address,
  threshold: number = 0.8
): boolean {
  const normalized1 = normalizeAddress(address1);
  const normalized2 = normalizeAddress(address2);

  const streetSimilarity = stringSimilarity(normalized1.street, normalized2.street);
  const citySimilarity = stringSimilarity(normalized1.city, normalized2.city);
  const stateSimilarity = stringSimilarity(normalized1.state, normalized2.state);
  const zipSimilarity = normalized1.postalCode === normalized2.postalCode ? 1 : 0;
  const countrySimilarity = stringSimilarity(normalized1.country, normalized2.country);

  const overallSimilarity =
    (streetSimilarity + citySimilarity + stateSimilarity + zipSimilarity + countrySimilarity) /
    5;

  return overallSimilarity >= threshold;
}

export function validateAddress(address: Address): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!address.street?.trim()) {
    errors.push('Street is required');
  }
  if (!address.city?.trim()) {
    errors.push('City is required');
  }
  const hasStateId = typeof address.stateId === 'number' && address.stateId > 0;
  if (!address.state?.trim() && !hasStateId) {
    errors.push('State is required');
  }

  const postalCode = address.postalCode?.trim();
  if (!postalCode) {
    errors.push('Postal code is required');
  } else if (address.country?.trim()) {
    const countryCode = getCountryCodeFromName(address.country);
    if (countryCode && !validateZipCodeByCountry(postalCode, countryCode)) {
      errors.push(`Invalid zip code format for ${address.country}`);
    }
  } else if (!validateZipCodeByCountry(postalCode, CountryCodes.MX)) {
    // No country provided — default market is Mexico (5-digit zip)
    errors.push('Invalid zip code format');
  }

  return { isValid: errors.length === 0, errors };
}

const TIMEZONE_BY_COUNTRY: Record<string, string> = {
  'united states': 'America/New_York',
  canada: 'America/Toronto',
  mexico: 'America/Mexico_City',
  spain: 'Europe/Madrid',
  france: 'Europe/Paris',
  germany: 'Europe/Berlin',
  'united kingdom': 'Europe/London',
  italy: 'Europe/Rome',
  brazil: 'America/Sao_Paulo',
  argentina: 'America/Argentina/Buenos_Aires',
  colombia: 'America/Bogota',
  chile: 'America/Santiago',
};

export function getTimeZone(countryName: string): string {
  return TIMEZONE_BY_COUNTRY[countryName.trim().toLowerCase()] ?? 'UTC';
}

export class AddressFactory {
  static createUSAddress(street: string, city: string, state: string, zipCode: string): Address {
    return { street, city, state, postalCode: zipCode, country: 'United States' };
  }

  static createCanadianAddress(street: string, city: string, province: string, postalCode: string): Address {
    return { street, city, state: province, postalCode, country: 'Canada' };
  }

  static createSpanishAddress(street: string, city: string, province: string, postalCode: string): Address {
    return { street, city, state: province, postalCode, country: 'Spain' };
  }

  static fromString(addressString: string, country: string): Address | null {
    const parts = addressString.split(',').map((p) => p.trim());
    if (parts.length < 3) return null;
    return {
      street: parts[0],
      city: parts[parts.length - 3] ?? '',
      state: parts[parts.length - 2] ?? '',
      postalCode: parts[parts.length - 1] ?? '',
      country,
    };
  }
}

function capitalizeWords(value: string): string {
  return value.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

function stringSimilarity(value1: string, value2: string): number {
  const longer = value1.length > value2.length ? value1 : value2;
  const shorter = value1.length > value2.length ? value2 : value1;

  if (longer.length === 0) {
    return 1;
  }

  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

function levenshteinDistance(value1: string, value2: string): number {
  const matrix: number[][] = [];

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
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[value2.length][value1.length];
}
