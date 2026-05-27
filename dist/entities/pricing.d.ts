import { BaseEntity } from '../core/base-entity';
export interface PricingItem extends BaseEntity {
    id?: number;
    productId: number;
    price: number;
}
export interface GroupPrice extends BaseEntity {
    id?: number;
    groupId: number;
    price: number;
}
export interface Pricing extends BaseEntity {
    id: string;
    name: string;
    start: Date;
    end?: Date;
    branches?: string[];
    items?: PricingItem[];
    groups?: GroupPrice[];
}
//# sourceMappingURL=pricing.d.ts.map