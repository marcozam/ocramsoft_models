import { BaseEntity, SimpleEntity } from '../core/base-entity';

export interface ProductBrand extends SimpleEntity {}

export interface ProductCategory extends BaseEntity {
  name: string;
  hasStock?: boolean;
  /** When true, this category has product groups; products can be assigned a group. */
  hasGroups?: boolean;
  requiresProcessing?: boolean;
  isSupply?: boolean;
  /** When true, products in this category are schedulable services and carry a duration. */
  isSchedulable?: boolean;
  brands?: ProductBrand[];
  /** When true, products in this category can be scheduled/booked for appointments. */
  isSchedulable?: boolean;
}

export interface ProductGroup extends SimpleEntity {
  categoryId?: string;
}

export interface Product extends BaseEntity {
  name: string;
  sku?: string;
  isActive: boolean;
  category?: ProductCategory;
  brand?: ProductBrand;
  categoryId?: string;
  brandId?: string;
  groupId?: string;
  /** Service duration in minutes. Set (> 0) only for schedulable services. */
  durationMinutes?: number;
  /** Rich-text (HTML) product description. */
  description?: string;
  /** URL of the principal image, when one exists. */
  mainImageUrl?: string;
  /** All active images for the product (principal first). */
  images?: ProductImage[];
  /** When true, the product is eligible to be sold on the online store. */
  availableOnline?: boolean;
  /** Default appointment/service duration in minutes, when the product is schedulable. */
  durationMinutes?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  isPrincipal: boolean;
  order: number;
}
