/**
 * Optional modules an account turns on or off (settings key `features`:
 * `GET/PUT /config/features`, also listed by `GET /config`). The web hides
 * every reference to a module that is off.
 */
export interface AccountFeaturesConfig {
  /**
   * The account sells through the online store: products show the «Disponible
   * en tienda en línea» switch, the «En línea» tag and filter, and the Meta
   * catalog export. Off leaves each product's own `availableOnline` untouched.
   */
  onlineStore: boolean;
  /**
   * Read-only: whether this service can run an online store at all (false on
   * the shared pool). While false, `onlineStore` is always false and cannot
   * be turned on.
   */
  onlineStoreAvailable: boolean;
}

export type SaveAccountFeaturesConfigRequest = Pick<AccountFeaturesConfig, 'onlineStore'>;
