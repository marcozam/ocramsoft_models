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
}
