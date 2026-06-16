import { BaseEntity } from '../core/base-entity';

/**
 * A single inventory item: a product quantity tracked at a stock location.
 * Shared canonical shape consumed by BE (`IStockItem` alias) and FE (`StockItem`).
 */
export interface StockItem extends BaseEntity {
  /** Product name (denormalized for display). */
  name?: string;
  quantity: number;
  min?: number;
  max?: number;
  categoryId?: string;
  categoryName?: string;
}

/** Backward-compat alias for the BE-side name (`IStockItem`). */
export type IStockItem = StockItem;

/**
 * A physical or logical location that holds stock items. May be linked to a branch.
 * Shared canonical shape; repos extend with their own fields (e.g. FE `branchId`,
 * BE numeric `locationTypeId`).
 */
export interface StockLocation extends BaseEntity {
  name: string;
  locationType?: string;
  locationTypeId?: string | number;
  items?: StockItem[];
}
