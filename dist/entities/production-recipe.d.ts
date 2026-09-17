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
/** List row: a product that declares its own active recipe. */
export interface ProductRecipeSummary {
    productId: string;
    productName: string;
    sku?: string;
    isGrouper: boolean;
    parentId?: string;
    parentName?: string;
    lineCount: number;
    version: number;
    /** ISO 8601 UTC instant the active version was saved. */
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
//# sourceMappingURL=production-recipe.d.ts.map