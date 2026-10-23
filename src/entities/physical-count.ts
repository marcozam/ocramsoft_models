/**
 * One counted product of a physical inventory count: the quantity found on
 * the shelf. `0` = looked for and not found; a product left out of the count
 * keeps its stock.
 */
export interface PhysicalCountLine {
  productId: string;
  physicalQuantity: number;
}

/**
 * Body of POST /stock/:locationId/physical-counts. `categoryIds` records which
 * categories were counted (absent or empty = the whole location); only the
 * products in `lines` are adjusted.
 */
export interface PhysicalCountCreate {
  categoryIds?: string[];
  lines: PhysicalCountLine[];
  notes?: string;
}

/** The recorded count and how many products had their stock adjusted. */
export interface PhysicalCountResult {
  id: string;
  adjustedCount: number;
}

/**
 * When a stock-keeping category of a location was last counted
 * (GET /stock/:locationId/physical-counts/last-by-category). A count with no
 * scope covers every category. `countId` / `countedAt` are null when never counted.
 */
export interface CategoryLastCount {
  categoryId: string;
  categoryName: string;
  countId: string | null;
  /** ISO 8601 UTC instant. */
  countedAt: string | null;
}
