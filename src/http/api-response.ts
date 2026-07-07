export enum ResponseCode {
  EXISTING = 1001,
  EXISTING_SESSION_INVALID_BRANCH = 1002,
  CREATED = 2010,
  NO_ACTIVE_ENTITY = 4000,
  NOT_FOUND = 4040,
  FORBIDDEN = 4030,
  UNAUTHORIZED = 4010,
  CONFLICT = 4090,
}

export interface HttpApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errorCode?: string;
  count?: number;
  total?: number;
  code?: ResponseCode;
  nextPageToken?: string | null;
}

/**
 * Minimal reference to the record that caused a duplicate conflict.
 * Returned as the `data` payload of a 409 `EXISTING` response so clients
 * can link the user to the already-existing record.
 */
export interface ExistingEntitySummary {
  id: string;
  name: string;
  sku?: string;
}

/** `data` payload shape for 409 `EXISTING` responses. */
export interface DuplicateEntityData {
  existingEntity: ExistingEntitySummary;
}

export interface HttpQueryResponse<T> {
  success: boolean;
  data: T[];
  count: number;
  total?: number;
  nextPageToken?: string | null;
}
