import { Address, CountryCodes } from '../entities/address';
export declare function validateZipCodeByCountry(zipCode: string, countryCode: CountryCodes): boolean;
export declare function formatAddress(address: Address | null | undefined): string;
export declare function normalizeAddress(address: Address): Address;
export declare function getCountryCodeFromName(countryName: string): CountryCodes | null;
export declare function areAddressesSimilar(address1: Address, address2: Address, threshold?: number): boolean;
export declare function validateAddress(address: Address): {
    isValid: boolean;
    errors: string[];
};
export declare function getTimeZone(countryName: string): string;
export declare class AddressFactory {
    static createUSAddress(street: string, city: string, state: string, zipCode: string): Address;
    static createCanadianAddress(street: string, city: string, province: string, postalCode: string): Address;
    static createSpanishAddress(street: string, city: string, province: string, postalCode: string): Address;
    static fromString(addressString: string, country: string): Address | null;
}
//# sourceMappingURL=address.utils.d.ts.map