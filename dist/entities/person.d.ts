import { BaseEntity } from '../core/base-entity';
export declare enum Sexo {
    Hombre = 1,
    Mujer = 2
}
export interface Person extends BaseEntity {
    name: string;
    paternalSurname?: string;
    maternalSurname?: string;
    dateOfBirth?: Date;
    sexId?: Sexo | number | null;
}
//# sourceMappingURL=person.d.ts.map