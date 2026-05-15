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
  data?: T;
  message?: string;
  errorCode?: string;
  count?: number;
  total?: number;
  code?: ResponseCode;
  nextPageToken?: string | null;
}

export interface HttpQueryResponse<T> {
  success: boolean;
  data: T[];
  count: number;
  total?: number;
  nextPageToken?: string | null;
}
