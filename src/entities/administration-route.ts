/**
 * A route of administration (oral, subcutánea, intramuscular…) from the
 * platform catalog `CatViaAdministracion`, shared by every part of the clinical
 * record that says how a medicine is given. Served by
 * GET /veterinarian/administration-routes.
 */
export interface AdministrationRoute {
  id: number;
  /** Stable code, never shown (`ORAL`, `SUBCUTANEA`…). */
  code: string;
  name: string;
  /** What a printed document shows («VO», «SC», «IM»). */
  abbreviation: string;
  isActive: boolean;
}
