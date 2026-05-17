import { BaseEntity } from '../core/base-entity';

export interface PricingItem extends BaseEntity {
  productId: string;
  price: number;
}

export interface Pricing extends BaseEntity {
  name: string;
  start: Date;
  end?: Date;
  branches?: string[];
  items?: PricingItem[];
}
