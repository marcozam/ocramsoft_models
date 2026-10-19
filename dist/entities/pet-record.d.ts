/**
 * Veterinary vertical — the parts of a pet's clinical file (expediente) that
 * are not a visit: reproductive status, signed consents and the euthanasia
 * record (NOM-033-SAG/ZOO-2014). Served under /veterinarian/pets/{petId}.
 */
/** `Mascotas.IDEstadoReproductivo`. */
export declare enum ReproductiveStatus {
    Intact = 1,
    Sterilized = 2,
    Pregnant = 3,
    Lactating = 4
}
export declare const REPRODUCTIVE_STATUS_LABELS: Record<ReproductiveStatus, string>;
/** `ConsentimientoMascota.Tipo`. */
export declare enum ConsentType {
    General = 1,
    Anesthesia = 2,
    Surgery = 3,
    Hospitalization = 4,
    Euthanasia = 5,
    Recording = 6
}
export declare const CONSENT_TYPE_LABELS: Record<ConsentType, string>;
/**
 * A consent the owner signed. `text` is the exact wording they read, frozen
 * when it was signed. `text` and `signature` only come back from
 * GET /pets/{petId}/consents/{id} and from the POST that creates it.
 */
export interface PetConsent {
    /** Public GUID. */
    id: string;
    petId: string;
    type: ConsentType;
    typeName?: string;
    /** ISO 8601 UTC. */
    date: string;
    /** The visit the consent belongs to, if any. */
    recordId?: string | null;
    procedure?: string | null;
    risks?: string | null;
    text?: string;
    /** The owner (person) who signed, when it is a linked owner. */
    personId?: number | null;
    personName?: string | null;
    signerName: string;
    signerRelationship?: string | null;
    /** `data:image/png;base64,…` */
    signature?: string | null;
    hasSignature: boolean;
    professionalUserId?: number | null;
    createdAt?: string | null;
}
/** Body of POST /veterinarian/pets/{petId}/consents. */
export interface CreatePetConsentRequest {
    type: ConsentType;
    /** ISO 8601; omitted = now. */
    date?: string;
    recordId?: string | null;
    procedure?: string | null;
    risks?: string | null;
    text: string;
    personId?: number | null;
    signerName: string;
    signerRelationship?: string | null;
    /** `data:image/png;base64,…`, at most 300 KB. */
    signature?: string | null;
    professionalUserId?: number | null;
}
/**
 * The euthanasia record of a pet (NOM-033-SAG/ZOO-2014): one per pet. It
 * requires a signed consent of type `Euthanasia` and sets the pet's
 * `dateOfDeath`.
 */
export interface PetEuthanasia {
    /** Public GUID. */
    id: string;
    petId: string;
    /** The type-5 consent (public GUID). */
    consentId: string;
    recordId?: string | null;
    /** ISO 8601 UTC. */
    date: string;
    reason: string;
    method: string;
    premedication?: string | null;
    drug: string;
    productId?: number | null;
    productName?: string | null;
    /** Inventory lot (public GUID) the drug came from. */
    lotId?: string | null;
    lotCode?: string | null;
    /** `yyyy-MM-dd`. */
    lotExpiry?: string | null;
    dose: string;
    route: string;
    deathConfirmation: string;
    /** ISO 8601 UTC. */
    timeOfDeath?: string | null;
    bodyDisposal?: string | null;
    notes?: string | null;
    professionalUserId: number;
}
/** Body of POST /veterinarian/pets/{petId}/euthanasia. */
export interface CreatePetEuthanasiaRequest {
    consentId: string;
    recordId?: string | null;
    date?: string;
    reason: string;
    method: string;
    premedication?: string | null;
    drug: string;
    productId?: number | null;
    lotId?: string | null;
    dose: string;
    route: string;
    deathConfirmation: string;
    timeOfDeath?: string | null;
    bodyDisposal?: string | null;
    notes?: string | null;
    professionalUserId: number;
}
//# sourceMappingURL=pet-record.d.ts.map