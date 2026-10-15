import { BaseEntity } from '../core/base-entity';
import { Address } from './address';
export interface Branch extends BaseEntity {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    address?: Address;
    isActive?: boolean;
    stockLocationId?: string;
    pricingId?: string;
    /** IANA time zone of the branch, e.g. `America/Mexico_City`. */
    timeZone?: string;
}
//# sourceMappingURL=branch.d.ts.map