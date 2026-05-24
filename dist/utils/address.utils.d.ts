import { Address, CountryCodes } from '../entities/address';
export declare function formatAddress(address: Address | null | undefined): string;
export declare function normalizeAddress(address: Address): Address;
export declare function getCountryCodeFromName(countryName: string): CountryCodes | null;
export declare function areAddressesSimilar(address1: Address, address2: Address, threshold?: number): boolean;
//# sourceMappingURL=address.utils.d.ts.map