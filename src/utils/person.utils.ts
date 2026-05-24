import { Person } from '../entities/person';

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
