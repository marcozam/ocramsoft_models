/** One insumo of a production recipe. */
export interface ProductRecipeLine {
  supplyId: string;
  supplyName: string;
  sku?: string;
  categoryName?: string;
  /** Amount consumed per finished unit, in the insumo's stock unit (up to 4 decimals). */
  quantity: number;
  notes?: string;
}

/**
 * Recipe (bill of materials) of a finished product.
 *
 * Variation recipes are additive: `inheritedLines` are the grouper's shared
 * insumos (edited on the grouper, read-only on the variation) and `lines` are
 * the ones unique to this product. Producing the variation consumes both.
 */
export interface ProductRecipe {
  productId: string;
  productName: string;
  sku?: string;
  isGrouper: boolean;
  /** Grouper this product is a variation of. Undefined for groupers and standalone products. */
  parentId?: string;
  parentName?: string;
  /** Active version of the product's own lines. 0 = the product has no own recipe. */
  version: number;
  lines: ProductRecipeLine[];
  /** The grouper's active lines. Always empty when the product is not a variation. */
  inheritedLines: ProductRecipeLine[];
}

/**
 * List row: a base recipe — a grouper or a standalone product. Variations are
 * never listed on their own; their recipes roll up into the grouper, which is
 * listed even when only its variations declare insumos.
 */
export interface ProductRecipeSummary {
  productId: string;
  productName: string;
  sku?: string;
  isGrouper: boolean;
  /** Insumos the base product declares itself (0 when only variations have recipes). */
  lineCount: number;
  /** Active version of the base product's own lines. 0 = no own recipe. */
  version: number;
  /** Variations that declare their own insumos. Always 0 for a standalone product. */
  variationRecipeCount: number;
  /** ISO 8601 UTC instant of the latest save across the base and its variations. */
  savedAt?: string;
}

/** Body of PUT /production/recipe/:productId. An empty `lines` array clears the recipe. */
export interface SaveProductRecipeRequest {
  lines: SaveProductRecipeLine[];
}

export interface SaveProductRecipeLine {
  supplyId: string;
  quantity: number;
  /** Max 100 characters. */
  notes?: string;
}
