/**
 * Clinical formulary: recommended doses per active ingredient, species, breed
 * and weight range, maintained centrally by the platform team and identical
 * for every clinic. A recommendation is a suggestion; the vet decides the dose.
 */
import type { PrescriptionDoseUnit } from './prescription';

/** `DosisReferencia.UnidadDosis`: dose per kg of body weight or per animal. */
export type DoseUnitCode = 'mg_kg' | 'ui_kg' | 'ml_kg' | 'mg_animal' | 'ml_animal';

/** Unit of the ingredient's amount in one inventory unit of a product. */
export type ConcentrationUnit = 'mg' | 'mcg' | 'g' | 'ui' | 'ml';

export interface ClinicalSource {
  title: string;
  url: string | null;
}

/** The catalog version in force. `reviewerName` `null` = pending the MVZ review. */
export interface ClinicalCatalogVersion {
  version: number;
  reviewerName: string | null;
  reviewerLicense: string | null;
  /** `YYYY-MM-DD`. */
  reviewedOn: string | null;
}

export interface DoseReference {
  id: string;
  activeIngredientId: string;
  doseMin: number;
  doseMax: number;
  doseUnit: DoseUnitCode;
  routeId: number | null;
  routeName: string | null;
  routeAbbreviation: string | null;
  everyHoursMin: number | null;
  everyHoursMax: number | null;
  durationDaysMin: number | null;
  durationDaysMax: number | null;
  /** Cap per administration, in the dose unit's amount (mg, UI or ml). */
  maxDosePerAdministration: number | null;
  instructions: string | null;
  source: ClinicalSource;
  sinceVersion: number;
  /** `true` when the reference is specific to the pet's breed. */
  breedSpecific: boolean;
}

export type ContraindicationSeverity = 'contraindicated' | 'caution';

export interface IngredientContraindication {
  activeIngredientId: string;
  severity: ContraindicationSeverity;
  reason: string;
  /** `null` = the whole species. */
  breedName: string | null;
  source: ClinicalSource;
}

/** An active ingredient of a clinic product, per one inventory unit (ml, tableta…). */
export interface ProductActiveIngredient {
  activeIngredientId: string;
  key: string;
  name: string;
  concentration: number;
  concentrationUnit: ConcentrationUnit;
  principal: boolean;
}

/** Body item of `PUT /products/:id/active-ingredients`. */
export interface ProductActiveIngredientInput {
  activeIngredientId: string;
  concentration: number;
  concentrationUnit: ConcentrationUnit;
  principal: boolean;
}

/** Response of `PUT /products/:id/active-ingredients`. */
export interface ProductActiveIngredientsResult {
  ingredients: ProductActiveIngredient[];
  /** The product has no inventory unit: concentrations cannot be applied yet. */
  inventoryUnitMissing: boolean;
}

export type DoseSuggestionReason = 'no_weight' | 'no_concentration' | 'no_reference';

/** The amount per administration for one `DoseReference`. */
export interface DoseSuggestion {
  /** Amount of the ingredient per administration (mg, UI or ml), after the cap. */
  amountMin: number | null;
  amountMax: number | null;
  amountUnit: string | null;
  /** Proposed quantity of the product (or of the ingredient without one). */
  quantity: number | null;
  quantityUnit: PrescriptionDoseUnit | null;
  /** The proposed quantity gives a dose inside the range. */
  withinRange: boolean | null;
  reason: DoseSuggestionReason | null;
}

export interface IngredientDoseRecommendation {
  activeIngredientId: string;
  name: string;
  concentration: number | null;
  concentrationUnit: ConcentrationUnit | null;
  principal: boolean;
  /** One reference per route. */
  doses: DoseReference[];
  /** Parallel to `doses`. */
  suggestions: DoseSuggestion[];
}

/** Response of `GET /veterinarian/pets/:petId/dose-recommendation`. */
export interface DoseRecommendation {
  petId: string;
  species: string | null;
  breed: string | null;
  weightKg: number | null;
  /** ISO 8601 UTC. */
  weightDate: string | null;
  /** The last weight is older than 30 days. */
  weightStale: boolean;
  catalog: ClinicalCatalogVersion;
  ingredients: IngredientDoseRecommendation[];
  contraindications: IngredientContraindication[];
}
