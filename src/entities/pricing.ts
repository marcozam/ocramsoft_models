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
  name: string;
  start: Date;
  end?: Date;
  branches?: string[];
  items?: PricingItem[];
  groups?: GroupPrice[]; // Optional - only populated when fetching details
}
