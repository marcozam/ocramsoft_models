/**
 * Customer self-service pet records (public storefront).
 *
 * Authorized by the customer access token (`customer-auth.ts`); every call is
 * scoped to the token's customer, who is always an owner of the pets returned
 * or created here. Pets are addressed by their PublicId GUID — internal
 * integer ids never appear.
 */
/** A pet as seen by its owner in the storefront. */
export interface CustomerPet {
    /** Pet PublicId GUID. */
    id: string;
    name: string;
    speciesId: number;
    speciesName?: string;
    breedId?: number | null;
    breedName?: string | null;
    /** CatSexo id: 1 = male (macho), 2 = female (hembra). */
    sexId?: number | null;
    /** Date of birth, YYYY-MM-DD. */
    dateOfBirth?: string | null;
}
/** Request body for POST /customer/pets. */
export interface CreateCustomerPetRequest {
    name: string;
    speciesId: number;
    /** Existing breed id; mutually exclusive with breedName. */
    breedId?: number;
    /** Free-text breed — resolved or created under the chosen species. */
    breedName?: string;
    /** CatSexo id: 1 = male, 2 = female. */
    sexId?: number;
    /** Date of birth, YYYY-MM-DD. */
    dateOfBirth?: string;
}
//# sourceMappingURL=customer-pet.d.ts.map