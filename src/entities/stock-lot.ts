/**
 * Expiry state of a lot. `expiring` means it expires within the account's
 * `InventoryConfig.expiryAlertDays`; `no-expiry` means the lot has no expiration date.
 */
export type StockLotStatus = 'valid' | 'expiring' | 'expired' | 'no-expiry';

/** A lot (batch) of a product. */
export interface StockLot {
  /** Lot PublicId. */
  id: string;
  productId: string;
  code: string;
  /** `yyyy-MM-dd`; `null` when the lot does not expire. */
  expirationDate?: string | null;
  supplierId?: string | null;
}

/** Quantity of a lot held at one stock location. */
export interface StockLotBalance extends StockLot {
  locationId: string;
  quantity: number;
  status: StockLotStatus;
  /** Negative once expired; `null` when the lot does not expire. */
  daysToExpiry?: number | null;
  productName?: string;
  categoryName?: string;
  branchName?: string;
}

export interface StockLotDetail {
  lot: StockLot;
  productName: string;
  balances: StockLotBalance[];
}

/** One inventory movement of a lot. */
export interface StockLotMovement {
  id: string;
  /** ISO 8601 UTC instant. */
  dateTime: string;
  movementTypeId: number;
  movementType: string;
  quantity: number;
  reference: string;
  locationId: string;
  locationName?: string;
  userName?: string;
}

/**
 * Identifies a lot on a stock operation: an existing lot by `lotId`, or a lot
 * by `lotCode` (+ `expirationDate`), created when it does not exist yet.
 */
export interface LotRef {
  lotId?: string;
  lotCode?: string;
  /** `yyyy-MM-dd`. */
  expirationDate?: string | null;
}

/** Quantity of one lot received on a purchase line. */
export interface LotQuantity {
  lotCode: string;
  /** `yyyy-MM-dd`. */
  expirationDate?: string | null;
  quantity: number;
}

/** An expired lot consumed by a sale; the sale is still created. */
export interface ExpiredLotWarning {
  productId: string;
  productName?: string;
  lotId: string;
  lotCode: string;
  /** `yyyy-MM-dd`. */
  expirationDate: string;
  quantity: number;
}

export interface InventoryConfig {
  /** Days before expiration a lot counts as `expiring`. Default 30. */
  expiryAlertDays: number;
}
