/**
 * Veterinary vertical — medical tests (estudios clínicos).
 *
 * Each study type (e.g. Reporte Citológico) captures a set of attributes from
 * a global catalog; a study stores one value per attribute. Served under
 * /veterinarian/test-types and /veterinarian/tests.
 */

/**
 * How an attribute is captured. Maps the SQL `TipoDato`:
 * 1 numeric, 2 text, 3 boolean, 4 option, 5 multioption.
 */
export type TestAttributeDataType =
  | 'numeric'
  | 'text'
  | 'boolean'
  | 'option'
  | 'multioption';

/** A study type from the catalog; its attributes are fetched per type. */
export interface TestType {
  id: number;
  name: string;
}

/** One capturable attribute of a study type, in report order. */
export interface TestAttribute {
  attributeId: number;
  name: string;
  dataType: TestAttributeDataType;
  unit: string | null;
  refMin: number | null;
  refMax: number | null;
  /** Valid choices for `option` / `multioption`; empty for other types. */
  options: string[];
  /** Report section header the attribute is printed under. */
  section: string | null;
  order: number;
}

/** A captured value of one attribute within a study. */
export interface MedicalTestValue {
  attributeId: number;
  attributeName: string;
  dataType: TestAttributeDataType;
  unit: string | null;
  section: string | null;
  numericValue: number | null;
  /** For `multioption`, the chosen labels joined with `|`. */
  textValue: string | null;
  /** Set only when `dataType` is `boolean`. */
  boolValue: boolean | null;
  refMin: number | null;
  refMax: number | null;
  /** Numeric values only: the value falls outside a reference bound. */
  outOfRange: boolean;
  observation: string | null;
}

/** A study performed on a patient, with its captured values. */
export interface MedicalTest {
  id: string;
  patientId: string;
  testTypeId: number;
  testTypeName?: string;
  /** Visit (expediente record) the study was ordered from, if any. */
  healthRecordId: string | null;
  date: string | null;
  notes: string | null;
  interpretation: string | null;
  suggestions: string | null;
  professionalUserId: number | null;
  isActive: boolean;
  values: MedicalTestValue[];
}

/**
 * A value as sent on create/update. The gateway routes it to the numeric or
 * text column from the attribute's `dataType`; `multioption` takes `string[]`.
 */
export interface MedicalTestValueInput {
  attributeId: number;
  value: number | string | boolean | string[];
  observation?: string;
}

/** Request body for POST /veterinarian/pets/{petId}/tests. */
export interface CreateMedicalTestRequest {
  testTypeId: number;
  healthRecordId?: number | string;
  date?: string;
  notes?: string;
  interpretation?: string;
  suggestions?: string;
  professionalUserId?: number;
  values: MedicalTestValueInput[];
}

/**
 * Request body for PUT /veterinarian/tests/{testId}. The study type is
 * immutable; each value sent is upserted and values not sent are kept.
 */
export interface UpdateMedicalTestRequest {
  date?: string;
  notes?: string;
  interpretation?: string;
  suggestions?: string;
  professionalUserId?: number;
  values?: MedicalTestValueInput[];
}
