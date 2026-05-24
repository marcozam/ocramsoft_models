import { Person } from '../entities/person';

export interface SplitNameResult {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

const SURNAME_PARTICLES = new Set([
  'de', 'del', 'la', 'las', 'los', 'y', 'da', 'das', 'dei', 'delos',
  'della', 'di', 'do', 'dos', 'van', 'von', 'san', 'santa',
]);

export function splitFullName(fullName: string): SplitNameResult {
  const tokens = fullName
    .trim()
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (tokens.length === 0) return { nombre: '', apellidoPaterno: '', apellidoMaterno: '' };
  if (tokens.length === 1) return { nombre: tokens[0], apellidoPaterno: '', apellidoMaterno: '' };
  if (tokens.length === 2) return { nombre: tokens[0], apellidoPaterno: tokens[1], apellidoMaterno: '' };

  const extractSurname = (endIndex: number): { surname: string; nextIndex: number } => {
    let startIndex = endIndex;
    while (startIndex - 1 >= 0 && SURNAME_PARTICLES.has(tokens[startIndex - 1].toLowerCase())) {
      startIndex -= 1;
    }
    return { surname: tokens.slice(startIndex, endIndex + 1).join(' '), nextIndex: startIndex - 1 };
  };

  const maternoExtract = extractSurname(tokens.length - 1);
  const paternoExtract =
    maternoExtract.nextIndex >= 0
      ? extractSurname(maternoExtract.nextIndex)
      : { surname: '', nextIndex: -1 };

  let nombre = tokens.slice(0, paternoExtract.nextIndex + 1).join(' ').trim();
  let apellidoPaterno = paternoExtract.surname;
  const apellidoMaterno = maternoExtract.surname;

  if (!nombre) {
    nombre = tokens[0];
    if (!apellidoPaterno && tokens.length > 1) apellidoPaterno = tokens[1];
  }

  return { nombre, apellidoPaterno, apellidoMaterno };
}

export function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function normalizeOptionalDate(value: unknown): Date | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function normalizeOptionalPositiveInt(value: unknown): number | undefined {
  if (value === undefined || value === null || String(value).trim() === '') {
    return undefined;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error('Value must be a positive integer when provided');
  }

  return parsed;
}

export function formatPersonFullName(person: Person): string {
  if (!person) {
    return '';
  }

  return [person.name, person.paternalSurname, person.maternalSurname]
    .filter((part) => typeof part === 'string' && part.trim().length > 0)
    .map((part) => String(part).trim())
    .join(' ');
}
