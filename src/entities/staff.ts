/** What a team member does; several at once. */
export type StaffFunction = 'vet' | 'groomer' | 'reception' | 'other';

export interface StaffProfessional {
  printedName: string;
  licenseNumber?: string | null;
  specialty?: string | null;
  specialtyLicenseNumber?: string | null;
  hasSignature: boolean;
}

/** A lunch break is two ranges on the same day. */
export interface StaffHoursRange {
  /** 1 = Monday … 7 = Sunday. */
  day: number;
  /** HH:mm */
  open: string;
  /** HH:mm */
  close: string;
}

export interface StaffAgenda {
  resourceId: number;
  name: string;
  branchId: number;
  kind: 'grooming';
  isActive: boolean;
  hours: StaffHoursRange[];
}

export type StaffAccess =
  | 'password'
  | 'invited'
  | 'invite_expired'
  | 'google'
  | 'none';

export interface StaffMember {
  /** null: an agenda with no user (created before users were linked). */
  userPublicId: string | null;
  userName: string | null;
  name: string;
  email?: string | null;
  functions: StaffFunction[];
  roles: string[];
  access: StaffAccess | null;
  isActive: boolean;
  /** The signed-in user. */
  isSelf: boolean;
  professional: StaffProfessional | null;
  agenda: StaffAgenda | null;
}

export interface StaffCreateRequest {
  name: string;
  functions: StaffFunction[];
  /** Auth role given for the `other` function. */
  otherRole?: string;
  access: {
    userName: string;
    email?: string;
    mode: 'invite' | 'password';
    temporaryPassword?: string;
  };
  professional?: {
    printedName: string;
    licenseNumber?: string;
    specialty?: string;
    specialtyLicenseNumber?: string;
    /** Data URL. */
    signature?: string;
  };
  agenda?: { enabled: boolean; branchId: number; hours: StaffHoursRange[] };
  /** Retry after the user was created: the user step is skipped. */
  userPublicId?: string;
}

export type StaffStepId = 'user' | 'reference' | 'professional' | 'agenda' | 'hours';

export interface StaffStepResult {
  step: StaffStepId;
  ok: boolean;
  message?: string;
}

export interface StaffSaveResult {
  member: StaffMember | null;
  userPublicId: string | null;
  steps: StaffStepResult[];
}

export type StaffUpdateRequest = Omit<StaffCreateRequest, 'access' | 'userPublicId'> & {
  email?: string;
};
