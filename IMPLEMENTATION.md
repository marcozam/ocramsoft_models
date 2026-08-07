# ocramsoft_models — Implementation Tracker

Extracted from the POS system's BE (`ocramsoft_gateway`) and FE (`lock-security-portal`) to create a single source of truth for shared TypeScript models.

---

## Status

| Phase | Status |
|---|---|
| 1. Shared package bootstrap | ✅ Done |
| 2. Shared model source files | ✅ Done |
| 3. BE migration | ✅ Done |
| 4. FE migration | ✅ Done |
| 5. Compile verification | ✅ Done |
| 6. Shared utility layer bootstrap | ✅ Done |

---

## Package

- **Name:** `@ocramsoft/models`
- **Location:** `ocramsoft_models/` (sibling directory to `ocramsoft_gateway/` and `lock-security-portal/`)
- **Output:** `dist/` (compiled CommonJS + `.d.ts`)
- **Dev reference:** `"@ocramsoft/models": "file:../ocramsoft_models"` in both consumers' `package.json`

---

## Shared Models Inventory

### `src/core/base-entity.ts`
| Export | Notes |
|---|---|
| `BaseEntity` | `id?: string, createdAt?, updatedAt?` — optional id (FE narrows to required locally) |
| `SimpleEntity` | `extends BaseEntity` + `name: string` |
| `NamedItem` | Minimal `{ id?, name }` — replaces FE's named-item.model.ts |

### `src/entities/address.ts`
| Export | Notes |
|---|---|
| `Address` | Merged from BE's `IAddress` and FE's `Address`. Full field set. |
| `IAddress` | Type alias for `Address` — backward compat for BE |
| `AddressCountry` | Replaces BE's `IAddressCountry` |
| `IAddressCountry` | Type alias — backward compat |
| `AddressState` | Replaces both repos' `AddressState`/`IAddressState` |
| `IAddressState` | Type alias — backward compat |
| `CountryCodes` | Enum (US, CA, MX, ES, BR, AR, CO, CL) |
| `CommonCountries` | Enum of common country display names |

### `src/entities/person.ts`
| Export | Notes |
|---|---|
| `Person` | `name, paternalSurname?, maternalSurname?, dateOfBirth?, sexId?` |
| `Sexo` | Enum `Hombre=1, Mujer=2` — was FE-only, now shared |

### `src/entities/user.ts`
| Export | Notes |
|---|---|
| `UserRole` | **Enum** `SYSTEM, ADMIN, USER, LOCK, MANAGER` — replaces BE enum + FE's `USER_ROLES` |
| `User` | Core shape: `userName, name, roles?, isActive?, lastLogin?` |

> **FE note:** FE had a `UserRole` *interface* `{ id, name }` — this is now `RoleRecord` in FE's user.model.ts to avoid collision with the enum.

### `src/entities/branch.ts`
| Export | Notes |
|---|---|
| `Branch` | `name, phone?, email?, address?, isActive` — FE narrows `phone` to required |

### `src/entities/customer.ts`
| Export | Notes |
|---|---|
| `Customer` | `phone, email?, person?, addresses?, isActive?, customerType?` |
| `CustomerType` | Enum `INDIVIDUAL=1, BUSINESS=2` |

### `src/entities/product.ts`
| Export | Notes |
|---|---|
| `ProductBrand` | `extends SimpleEntity` — FE alias: `Brand` |
| `ProductCategory` | Core category shape |
| `ProductGroup` | `extends SimpleEntity` + `categoryId?` |
| `Product` | Core product shape: `name, sku?, isActive, category?, brand?, categoryId?, brandId?, groupId?, durationMinutes?` (service duration) + `description?, mainImageUrl?, images?, availableOnline?` |
| `ProductCategory.isSchedulable?` | When true, products in the category are schedulable services |
| `ProductImage` | `{ id, url, isPrincipal, order }` — product image gallery item. BE re-exports it; FE keeps it via the `../products` barrel |

### `src/entities/appointment.ts`
| Export | Notes |
|---|---|
| `AppointmentStatus` | enum; values = CatStatus ids under IDUso 403 (40301 SCHEDULED … 40306 NO_SHOW) |
| `BookingChannel` | enum; values = CatCanalAgenda ids (1 SELF_SERVICE, 2 ON_BEHALF, 3 API) — how a booking was made |
| `AppointmentService` | One service line in an appointment: `serviceId, serviceName?, durationMinutes` |
| `Appointment` | Customer appointment: `branchId, customerId, services[], start, end, durationMinutes (Σ of services or manual), status, reason?, notes?, createdByUserId?, bookingChannel?, bookedByApiClientId?, resourceId?` (resource reserved for future) |
| `AppointmentSlot` | Availability slot: `start, end, available, resourceId?` |

### `src/entities/customer-auth.ts`
| Export | Notes |
|---|---|
| `CustomerOtpRequest` / `CustomerOtpVerifyRequest` | Public OTP flow bodies: `{ phone }` and `{ phone, code }` — phone verified via WhatsApp OTP |
| `VerifiedCustomer` | `{ exists, name? }` — identity resolved after OTP verify; when `exists === false` the FE collects a name and calls register |
| `CustomerTokenGrant` | `{ token, expiresIn, customer }` — full access grant; the token carries the customer PublicId, shared by every customer-facing flow (booking today, online sales next) |
| `CustomerOtpVerifyResponse` | `{ customer }` + either the access grant (existing customer) or `registrationToken`/`registrationExpiresIn` (unknown phone — only authorizes register) |
| `RegisterCustomerRequest` | `{ name }` — creates the customer for the OTP-verified phone and returns the access grant |

### `src/entities/booking.ts`
| Export | Notes |
|---|---|
| `BookingAvailabilityDay` / `BookingAvailabilityWeek` | Week view of **open slots only** (`date` YYYY-MM-DD + `AppointmentSlot[]`; `weekStart`, `durationMinutes`) |
| `BookingAppointment` | Customer's own appointment; `id` is the Cita PublicId GUID (internal int id never exposed) |
| `CreateBookingRequest` | `{ start, customerName?, reason? }` — `customerName` required only for first-time customers |
| `RescheduleBookingRequest` | `{ start }` — new slot start from the availability endpoint |

### `src/entities/stock.ts`
| Export | Notes |
|---|---|
| `StockItem` | Canonical inventory item: `quantity, name?, min?, max?, categoryId?, categoryName?` (extends `BaseEntity`). FE extends with required `id` + `product?`; BE extends with `locationId?` |
| `IStockItem` | Type alias for `StockItem` — backward compat for the BE name |
| `StockLocation` | `name, locationType?, locationTypeId?(string\|number), items?` (extends `BaseEntity`). BE narrows `locationTypeId` to required `number`; FE adds `itemsLoaded?, branchId?, branchName?` |

### `src/entities/optica-examen.ts`
| Export | Notes |
|---|---|
| `OpticaExamenOjo` | Eye measurement: esfera, cilindro, grados, distanciaInterPupilar |
| `OpticaExamen` | Full exam: patient, optometrista, mica refs, receta flags, both eyes |

### `src/entities/sale-order.ts`
| Export | Notes |
|---|---|
| `OpticaSaleOrder` | `extends SaleOrder` + `examen: OpticaExamen \| null` — sale order with the exam linked via OpticaExamenVenta (GET /optica/sale/:saleId) |

### `src/entities/sale-report.ts` (v4.3.0)
| Export | Notes |
|---|---|
| `SaleSummaryIncomeByPaymentMethod` | Income aggregated by payment method for a period |
| `SaleSummaryReport` | Monthly branch summary (GET /pos/sale/report/summary) |
| `ProductSoldByBranchReportItem` | Row of the products-sold-by-branch report: per-branch/product quantity, revenue, current stock (GET /pos/sale/report/products-sold) |
| `ProductsSoldReportFilters` | Query filters for the products-sold report (date range, branchId, categoryId, inStockOnly) |

### `src/http/api-response.ts`
| Export | Notes |
|---|---|
| `ResponseCode` | Enum of application response codes |
| `HttpApiResponse<T>` | Single-item response envelope |
| `HttpQueryResponse<T>` | List response envelope (new — was implied by FE's BaseRepository) |

### `src/entities/rules-engine.ts`
| Export | Notes |
|---|---|
| `RuleOperator` | `'eq'\|'ne'\|'lt'\|'lte'\|'gt'\|'gte'\|'between'\|'in'\|'nin'` |
| `Rule` | `{ field, operator, value }` — one product condition |
| `ProductRules` | `Rule[]` — a product's conditions (combined with AND) |
| `ProductWithRules` | `{ productId, rules? }` — no rules ⇒ always matches |
| `ProductEvaluation` | `{ productId, met }` |
| `evaluateRule` / `evaluateRules` | Pure evaluators (single rule / product AND) |
| `evaluateProducts` | Batch: evaluate many products vs the same input object |
| `filterMatchingProducts` | Batch: return only products that match |

### `src/utils/person.utils.ts`
| Export | Notes |
|---|---|
| `formatPersonFullName` | Shared full-name composition for BE/FE |
| `normalizeText` | Safe trim helper for optional text inputs |
| `normalizeOptionalDate` | Parses optional date-like values to `Date \| undefined` |
| `normalizeOptionalPositiveInt` | Shared positive integer parser/validator |

### `src/utils/address.utils.ts`
| Export | Notes |
|---|---|
| `formatAddress` | Shared compact address formatter |
| `normalizeAddress` | Shared address normalization helper |
| `getCountryCodeFromName` | Country name → `CountryCodes` mapping |
| `areAddressesSimilar` | Approximate duplicate-address detection helper |

---

## Migration Strategy

Both repos use a **re-export wrapper** approach:
- Model files in BE/FE import from `@ocramsoft/models` and re-export
- Existing imports in the rest of each codebase remain unchanged
- BE/FE-specific extensions (extra fields, stricter id, Firestore types) stay local

This minimizes the diff and avoids touching controllers, services, repositories.

---

## BE File Changes

| File | Change |
|---|---|
| `package.json` | Added `@ocramsoft/models` to `dependencies` |
| `src/models/nosql.model.ts` | Import+re-export `BaseEntity`, `SimpleEntity` from shared; keep Firestore types |
| `src/models/address.ts` | Import+re-export `IAddress`, `IAddressCountry`, `IAddressState`, `CountryCodes`, `CommonCountries` from shared; keep `validateZipCodeByCountry` locally |
| `src/types/http-response.types.ts` | Import+re-export `HttpApiResponse`, `ResponseCode` from shared; add `HttpQueryResponse` |
| `src/modules/person/models/person.model.ts` | Re-export `Person` from shared |
| `src/modules/user/models/user.model.ts` | Import `UserRole` enum from shared; keep BE-specific `UserResponse`, `User`, request DTOs |
| `src/modules/branch/models/branch.ts` | Import shared `Branch`, extend with BE fields (`code`, `coordinates`, `configuration`) |
| `src/modules/customer/models/customer.ts` | Import shared `Customer`, `CustomerType`; extend with BE fields |
| `src/modules/product/models/product.ts` | Import shared base types; extend `ProductCategory` and `Product` with BE fields; re-export shared `ProductImage` (local dup removed, v2.6.0) |
| `src/modules/stock/models/stock.ts` | `IStockItem` now extends shared `StockItem` + BE-only `locationId?`; `StockMovement`/`StockOperationType`/`StockValidation*` stay local (v2.6.0) |
| `src/modules/stock/models/stock-location.ts` | `StockLocation` extends shared `StockLocation`, narrows `locationTypeId` to required `number` (v2.6.0) |

## FE File Changes

| File | Change |
|---|---|
| `package.json` | Added `@ocramsoft/models` to `dependencies` |
| `src/app/models/entities.ts` | Import `BaseEntity` from shared; re-export with `id: string` (narrowed to required) |
| `src/shared/models/named-item.model.ts` | Re-export `NamedItem` from shared |
| `src/shared/models/address-state.model.ts` | Re-export `AddressState` from shared |
| `src/shared/models/addresses.models.ts` | Import `Address` from shared; extend with `id: string` |
| `src/shared/models/person.models.ts` | Re-export `Person`, `Sexo` from shared |
| `src/auth/models/user.model.ts` | Import shared `User`; extend with FE fields; rename `UserRole` interface to `RoleRecord` |
| `src/app/system/models/branch.model.ts` | Import shared `Branch`; extend with FE fields |
| `src/app/customers/models/customer.models.ts` | Import shared `Customer`; extend with FE-specific fields |
| `src/app/products/models/product.models.ts` | Import shared base types; extend with FE-specific fields; re-export shared `ProductImage` (local dup + `description`/`mainImageUrl`/`images` removed, v2.6.0) |
| `src/app/stock/models/index.ts` | `StockItem`/`StockLocation` extend shared types; FE keeps `BaseStockItem`, `StockMovement`, `NoStockProduct`, `LocationListResponse` local (v2.6.0) |

---

## Adding New Models (Quick Reference)

See `CLAUDE.md` for full instructions.

1. Add to `src/entities/{name}.ts`
2. Export from `src/index.ts`
3. Run `npm run build` in this repo
4. Import in BE/FE consumer(s)
5. Bump version: patch (new file), minor (new field), major (breaking)

---

## Evaluated but Kept Local (v2.6.0 Tier-1 review)

These Tier-1 candidates were diffed BE↔FE and deliberately **not** promoted — no clean shared superset exists, or the guardrails apply.

| Candidate | Why it stays local |
|---|---|
| `StockMovement` | BE shape is a write-command DTO (`{ productId, quantity, locationId? }`); FE shape is a transfer view-model (`extends StockItem { fromLocationId?, toLocationId? }`). Disjoint beyond `quantity`. Command/DTO guardrail → both stay local. |
| `StockOperationType` (enum) | Used only by BE stock repos/services; no FE consumer. |
| `StockValidationItem` / `StockValidationResult` / `IStockItem` extra fields | BE validation/repo-only shapes; not dual-consumed. |
| Optica mica catalog (`TipoMica`/`OpticaMicaTipo`, `MaterialMica`, `TratamientoMica`, price shapes) | Not the same shape across repos: BE (MSSQL) uses English field names + price-detail recordsets (`name`, `tipoMica: string\|null`, `tipoMicaId`); FE (Firebase legacy) uses Spanish names + `keyFB` Firebase keys (`nombre`, `tipoMica: number`, `tipoMicaID`). Field-name + type conflicts and Firebase document shapes → guardrail (Firestore shapes stay local). No clean superset. |
| `CustomerSearchFilters` | Disjoint field sets — BE `{ customerType?, isActive?, searchTerm?, hasAddress?, ageRange? }` vs FE `{ phone?, name?, email? }`. Filter/query shape, not identical/superset → kept local per the customer rule. |
| Lock `Device` / `DeviceLock` | No common identity field (BE `DeviceLock` keys off `BaseEntity.id`; FE `Device` keys off `uuid` with no `id`). BE shape carries a behavior method `isLocked()` + lock-domain fields; FE is a 3-field read view with response wrappers. Overlap (`model`, `status`) too thin to justify a shared entity. BE `IDeviceLock`/`DeviceLogs` and FE `DeviceListResponse`/`OTPResponse` stay local regardless. |

## Breaking Change Log

| Change | Reason |
|---|---|
| `UserRole` interface in FE renamed to `RoleRecord` | Collided with `UserRole` enum from shared package |
| `BaseEntity.id` is now `id?: string` in shared | BE always had it optional; FE narrows back to required locally |
| `Address` gains `colonyId?`, `latitude?`, `longitude?` | BE had these fields; added to shared for completeness |
| `Sexo` enum is now shared | Was FE-only; BE now references it too via shared package |
| `SaleOrderSummary.customerId` is now `string \| null` (v4.0.0) | Customer IDs exposed by the API are now the contact's public GUID (`Contacto.PublicId`), never the internal numeric ID (IDOR/enumeration hardening). `Customer.id` and `CreateSaleRequest.customerId` were already `string` and now carry the GUID. |
