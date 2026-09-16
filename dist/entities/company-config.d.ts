/**
 * Fiscal identity of the business running the system, stored in the gateway
 * `config/company` document and exposed through `/config`.
 *
 * Expense capture compares the CFDI receiver against `rfc` (and, once the
 * check exists, `taxRegime`), so these values must match what the SAT has
 * registered for the company.
 */
export interface CompanyConfig {
    /** Trade name printed on tickets and page headers. */
    name: string;
    /** Legal name (razón social) exactly as registered with the SAT. */
    razonSocial: string;
    /** RFC in upper case without separators (12 = persona moral, 13 = física). */
    rfc: string;
    /** SAT c_RegimenFiscal code (e.g. `601`); null until configured. */
    taxRegime: string | null;
}
//# sourceMappingURL=company-config.d.ts.map