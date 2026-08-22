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
 *
 * A customer is either a person or a business, per `customerType`:
 * INDIVIDUAL carries `person` and no `businessName`, BUSINESS the reverse.
 * Use `formatCustomerDisplayName()` rather than branching at each call site.
 */
export interface Customer extends BaseEntity {
    phone: string;
    email?: string;
    person?: Person;
    /** Trade name — set only when `customerType` is BUSINESS. */
    businessName?: string;
    addresses?: Address[];
    isActive?: boolean;
    customerType?: CustomerType;
}
//# sourceMappingURL=customer.d.ts.map