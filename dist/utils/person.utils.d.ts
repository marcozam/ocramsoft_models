import { Person } from '../entities/person';
export type PersonNameLike = Pick<Person, 'name' | 'paternalSurname' | 'maternalSurname'>;
export declare function normalizeText(value: unknown): string;
export declare function normalizeOptionalDate(value: unknown): Date | undefined;
export declare function normalizeOptionalPositiveInt(value: unknown): number | undefined;
export declare function formatPersonFullName(person: PersonNameLike | null | undefined): string;
//# sourceMappingURL=person.utils.d.ts.map