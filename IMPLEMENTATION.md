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
| `Product` | Core product shape: `name, sku?, isActive, category?, brand?, categoryId?, brandId?, groupId?, durationMinutes?` (service duration) |
| `ProductCategory.isSchedulable?` | When true, products in the category are schedulable services |

### `src/entities/appointment.ts`
| Export | Notes |
|---|---|
| `AppointmentStatus` | enum; values = CatStatus ids under IDUso 403 (40301 SCHEDULED … 40306 NO_SHOW) |
| `AppointmentService` | One service line in an appointment: `serviceId, serviceName?, durationMinutes` |
| `Appointment` | Customer appointment: `branchId, customerId, services[], start, end, durationMinutes (= Σ), status, notes?, resourceId?` (resource reserved for future) |
| `AppointmentSlot` | Availability slot: `start, end, available, resourceId?` |

### `src/entities/optica-examen.ts`
| Export | Notes |
|---|---|
| `OpticaExamenOjo` | Eye measurement: esfera, cilindro, grados, distanciaInterPupilar |
| `OpticaExamen` | Full exam: patient, optometrista, mica refs, receta flags, both eyes |

### `src/entities/sale-order.ts`
| Export | Notes |
|---|---|
| `OpticaSaleOrder` | `extends SaleOrder` + `examen: OpticaExamen \| null` — sale order with the exam linked via OpticaExamenVenta (GET /optica/sale/:saleId) |

### `src/http/api-response.ts`
| Export | Notes |
|---|---|
| `ResponseCode` | Enum of application response codes |
| `HttpApiResponse<T>` | Single-item response envelope |
| `HttpQueryResponse<T>` | List response envelope (new — was implied by FE's BaseRepository) |

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
| `src/modules/product/models/product.ts` | Import shared base types; extend `ProductCategory` and `Product` with BE fields |

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
| `src/app/products/models/product.models.ts` | Import shared base types; extend with FE-specific fields |

---

## Adding New Models (Quick Reference)

See `CLAUDE.md` for full instructions.

1. Add to `src/entities/{name}.ts`
2. Export from `src/index.ts`
3. Run `npm run build` in this repo
4. Import in BE/FE consumer(s)
5. Bump version: patch (new file), minor (new field), major (breaking)

---

## Breaking Change Log

| Change | Reason |
|---|---|
| `UserRole` interface in FE renamed to `RoleRecord` | Collided with `UserRole` enum from shared package |
| `BaseEntity.id` is now `id?: string` in shared | BE always had it optional; FE narrows back to required locally |
| `Address` gains `colonyId?`, `latitude?`, `longitude?` | BE had these fields; added to shared for completeness |
| `Sexo` enum is now shared | Was FE-only; BE now references it too via shared package |
