/**
 * The fiscal identity of the business, owned by the billing service: its main
 * razón social (`GET /issuers`, the primary one). Read-only in `/config`: the
 * gateway reads it from billing on each read and never stores it.
 */
export interface CompanyFiscalIdentity {
    /** PublicId of the razón social in billing. */
    razonSocialId: string;
    /** RFC in upper case without separators (12 = persona moral, 13 = física). */
    rfc: string;
    /** Legal name exactly as registered with the SAT. */
    legalName: string;
    /** SAT c_RegimenFiscal code (e.g. `626`); null when billing has none. */
    taxRegime: string | null;
    /** RFC of every razón social of the account: a CFDI received by any of them is the business's. */
    ownRfcs: string[];
}
/**
 * The business running the system, stored in the gateway `config/company`
 * document and exposed through `/config`. Its fiscal data (RFC, razón social,
 * régimen) are not stored here: they come from billing in `fiscal`.
 */
export interface CompanyConfig {
    /** Trade name printed on tickets and page headers. */
    name: string;
    /**
     * Attending veterinarian printed on the clinic's letterhead documents; null
     * until configured. Mexican airlines reject a pet travel health certificate
     * that does not carry the vet's name and professional licence.
     */
    vetName?: string | null;
    /** Cédula profesional of `vetName`; null until configured. */
    vetLicense?: string | null;
    /**
     * Download URL of the clinic's logo, printed on letterhead documents; null
     * until one is uploaded. Set through `POST /config/company/logo`, never by
     * hand — a `PUT /config/company` that omits it leaves the stored value alone.
     */
    logoUrl?: string | null;
    /**
     * The main razón social in billing; null when the account has none yet (or
     * billing could not be read). Read-only: a `PUT /config/company` ignores it.
     */
    fiscal?: CompanyFiscalIdentity | null;
}
//# sourceMappingURL=company-config.d.ts.map