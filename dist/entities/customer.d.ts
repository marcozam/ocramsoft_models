import { BaseEntity } from '../core/base-entity';
import { Person } from './person';
import { Address } from './address';
export declare enum CustomerType {
    INDIVIDUAL = 1,
    BUSINESS = 2
}
/**
 * Customer (CRM contact).
 * `id` is the contact's public GUID (Contacto.PublicId) — the internal
 * numeric contact ID is never exposed by the API.
 */
export interface Customer extends BaseEntity {
    phone: string;
    email?: string;
    person?: Person;
    addresses?: Address[];
    isActive?: boolean;
    customerType?: CustomerType;
}
//# sourceMappingURL=customer.d.ts.map