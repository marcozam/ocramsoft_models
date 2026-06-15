import { BaseEntity, SimpleEntity } from '../core/base-entity';
export interface ProductBrand extends SimpleEntity {
}
export interface ProductCategory extends BaseEntity {
    name: string;
    hasStock?: boolean;
    /** When true, this category has product groups; products can be assigned a group. */
    hasGroups?: boolean;
    requiresProcessing?: boolean;
    isSupply?: boolean;
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
}
//# sourceMappingURL=product.d.ts.map