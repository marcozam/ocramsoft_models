import { BaseEntity, SimpleEntity } from '../core/base-entity';
import { Rule } from './rules-engine';
export interface ProductBrand extends SimpleEntity {
}
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
    /**
     * Parent grouper this product is a variation of. Set only on variations;
     * `undefined` on standalone products and on groupers themselves.
     */
    parentId?: string;
    /**
     * When true, this row is an abstract grouper: it is never sold on its own and
     * exists only to hold variations. Callers must resolve it to one of its
     * variations before adding it to a sale.
     */
    isGrouper?: boolean;
    /** Number of active variations hanging off this grouper. 0 for a plain product. */
    variationCount?: number;
    /**
     * Rules that decide whether this product applies to a given case (e.g. a
     * grooming size that only applies above a weight). Evaluated with the
     * rules engine in `rules-engine.ts`, so backend and frontend agree.
     * Absent or empty means the product always applies.
     */
    conditions?: Rule[];
}
export interface ProductImage {
    id: string;
    url: string;
    isPrincipal: boolean;
    order: number;
}
//# sourceMappingURL=product.d.ts.map