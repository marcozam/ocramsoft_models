import { Person } from '../entities/person';
export interface SplitNameResult {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
}
export declare function splitFullName(fullName: string): SplitNameResult;
export declare function normalizeText(value: unknown): string;
export declare function normalizeOptionalDate(value: unknown): Date | undefined;
export declare function normalizeOptionalPositiveInt(value: unknown): number | undefined;
export declare function formatPersonFullName(person: Person): string;
//# sourceMappingURL=person.utils.d.ts.map