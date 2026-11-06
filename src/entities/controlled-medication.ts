/**
 * Controlled medication (NOM-064 risk groups, COFEPRIS classes): the active
 * ingredient catalog, dispensing rows recorded on a sale, the controlled
 * ledger report and the recipients of a lot.
 *
 * Ids follow the API's conventions: pets, lots, sales, customers and expenses
 * by PublicId; products, locations, branches and health records by their id as
 * a string; users by their numeric id.
 */

/** Risk group of a medication: Group I requires a prescription folio on every sale. */
export enum NomRiskGroup {
  GroupI = 1,
  GroupII = 2,
  GroupIII = 3,
}

export enum CofeprisClass {
  Estupefaciente = 1,
  PsicotropicoII = 2,
  PsicotropicoIII = 3,
}

/** Entry of the global active ingredient catalog (`GET /products/active-ingredients`). */
export interface ActiveIngredient {
  id: string;
  key: string;
  name: string;
  riskGroup: NomRiskGroup;
  cofeprisClass: CofeprisClass | null;
  antimicrobial: boolean;
  /** Reference brands containing the ingredient. */
  brands: string[];
  isActive: boolean;
}

/**
 * Body of `PUT /products/:id/risk-group`. An ingredient with no `riskGroup`
 * takes the ingredient's group; both `null` clear the classification.
 */
export interface SetProductRiskGroupRequest {
  activeIngredientId?: string | null;
  riskGroup?: NomRiskGroup | null;
}

/** Response of `PUT /products/:id/risk-group`. */
export interface ProductRiskGroup {
  riskGroup: NomRiskGroup | null;
  activeIngredientId: string | null;
  activeIngredientName: string | null;
}

/**
 * A controlled dispensing captured on a sale line (`SaleOrderItem.dispensing`).
 * Group I lines require rows whose quantities add up to the line quantity, each
 * with `prescriptionFolio`.
 */
export interface ControlledDispensingInput {
  /** Pet PublicId. */
  petId: string;
  /** Lot PublicId; omitted or `null` = stock without a lot. */
  lotId?: string | null;
  quantity: number;
  /** At most 50 characters. */
  dose: string;
  /** At most 50 characters. */
  route?: string | null;
  /** At most 100 characters. */
  frequency?: string | null;
  /** At most 100 characters. */
  duration?: string | null;
  prescriberUserId: number;
  /** At most 150 characters; omitted = the professional's printed name, else the user's name. */
  prescriberName?: string | null;
  /** Professional licence (cédula), at most 30 characters; omitted = the professional's. */
  prescriberLicense?: string | null;
  /** At most 50 characters. */
  prescriptionFolio?: string | null;
  /** Health application (`HealthRecordApplication.id`) the line charges. */
  healthApplicationId?: string | null;
  /** At most 500 characters. */
  notes?: string | null;
}

/** A recorded controlled dispensing. */
export interface ControlledDispensing extends ControlledDispensingInput {
  /** Dispensing PublicId. */
  id: string;
  productId: string;
  productName?: string;
  inventoryUnit?: string | null;
  riskGroup?: NomRiskGroup | null;
  petName?: string;
  species?: string;
  /** Customer PublicId of the pet's owner. */
  ownerId?: string | null;
  ownerName?: string | null;
  lotCode?: string | null;
  /** `yyyy-MM-dd`. */
  lotExpirationDate?: string | null;
  isActive: boolean;
  /** ISO 8601 UTC. */
  createdAt?: string;
  /** ISO 8601 UTC. */
  cancelledAt?: string | null;
  cancelReason?: string | null;
}

/** Balance of one product + lot + location over the report period. `lotId` `null` = without lot. */
export interface ControlledLedgerBalance {
  productId: string;
  productName: string;
  inventoryUnit: string | null;
  riskGroup: NomRiskGroup | null;
  activeIngredientName: string | null;
  lotId: string | null;
  lotCode: string | null;
  /** `yyyy-MM-dd`. */
  lotExpirationDate: string | null;
  locationId: string;
  locationName: string;
  branchId: string;
  branchName: string;
  openingBalance: number;
  entries: number;
  exits: number;
  closingBalance: number;
}

/** One inventory movement of a controlled product, with the dispensing behind a sale. */
export interface ControlledLedgerMovement {
  movementId: string;
  /** ISO 8601 UTC instant. */
  dateTime: string;
  movementTypeId: number;
  movementType: string;
  quantity: number;
  entry: number;
  exit: number;
  /** Running balance of the product + lot + location after this movement. */
  balance: number;
  productId: string;
  productName: string;
  inventoryUnit: string | null;
  riskGroup: NomRiskGroup | null;
  lotId: string | null;
  lotCode: string | null;
  /** `yyyy-MM-dd`. */
  lotExpirationDate: string | null;
  locationId: string;
  locationName: string;
  branchId: string;
  branchName: string;
  reference: string | null;
  userName: string | null;
  /** Sale PublicId (sales and their cancellations). */
  saleId: string | null;
  saleFolio: number | null;
  customerName: string | null;
  /** Expense PublicId (purchases). */
  expenseId: string | null;
  supplierName: string | null;
  dispensing: ControlledDispensing[];
}

/** `GET /reports/controlled-medication`. */
export interface ControlledLedgerReport {
  /** `yyyy-MM-dd`, inclusive. */
  from: string;
  /** `yyyy-MM-dd`, inclusive. */
  to: string;
  balances: ControlledLedgerBalance[];
  movements: ControlledLedgerMovement[];
}

export type LotRecipientSource = 'VENTA' | 'APLICACION' | 'EUTANASIA';

/** A patient who received product of a lot (`GET /stock/lots/:lotId/recipients`). */
export interface LotRecipient {
  source: LotRecipientSource;
  /** PublicId of the sale / euthanasia, or the application's id. */
  sourceId: string;
  /** ISO 8601 UTC instant. */
  date: string;
  /** Pet PublicId. */
  petId: string | null;
  petName: string | null;
  species: string | null;
  /** Customer PublicId. */
  ownerId: string | null;
  ownerName: string | null;
  quantity: number;
  dose: string | null;
  route: string | null;
  professionalName: string | null;
  professionalLicense: string | null;
  prescriptionFolio: string | null;
  /** Sale PublicId. */
  saleId: string | null;
  saleFolio: number | null;
  healthApplicationId: string | null;
  healthRecordId: string | null;
}
