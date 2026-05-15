import { BaseEntity } from '../core/base-entity';
export interface Address extends BaseEntity {
    street: string;
    extNumber?: string | number;
    intNumber?: string | number;
    neighborhood?: string;
    municipality?: string;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
    stateId?: number;
    municipalityId?: number;
    neighborhoodId?: number;
    colonyId?: number;
    latitude?: number;
    longitude?: number;
}
/** @deprecated Use Address */
export type IAddress = Address;
export interface AddressCountry {
    id: number;
    name: string;
    code: string;
}
/** @deprecated Use AddressCountry */
export type IAddressCountry = AddressCountry;
export interface AddressState {
    id: number;
    name: string;
    countryId: number;
    countryCode: string;
}
/** @deprecated Use AddressState */
export type IAddressState = AddressState;
export declare enum CountryCodes {
    US = "US",
    CA = "CA",
    MX = "MX",
    ES = "ES",
    BR = "BR",
    AR = "AR",
    CO = "CO",
    CL = "CL"
}
export declare enum CommonCountries {
    USA = "United States",
    CANADA = "Canada",
    MEXICO = "Mexico",
    SPAIN = "Spain",
    BRAZIL = "Brazil",
    ARGENTINA = "Argentina",
    COLOMBIA = "Colombia",
    CHILE = "Chile"
}
//# sourceMappingURL=address.d.ts.map