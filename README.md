# @ocramsoft/models

Shared TypeScript models for the OcramSoft POS system. Single source of truth for interfaces, enums, and HTTP envelope types consumed by both the backend ([ocramsoft_gateway](https://github.com/marcozam/ocramsoft_gateway)) and the frontend ([lock-security-portal](https://github.com/marcozam/lock-security-portal)).

---

## Installation

**Standard (works in local dev and cloud deployments):**

```bash
npm install --save github:marcozam/ocramsoft_models
```

This pulls directly from the GitHub repository. The compiled `dist/` is committed so no build step is needed in the consuming environment. A `prepare` script is also included as a fallback for fresh clones.

**Pinned to a specific version (recommended for production):**

```bash
npm install --save github:marcozam/ocramsoft_models#v1.0.0
```

Replace `v1.0.0` with any tag from the [releases page](https://github.com/marcozam/ocramsoft_models/releases).

**`package.json` reference:**

```json
"@ocramsoft/models": "github:marcozam/ocramsoft_models"
```

---

## What's in the package

### Core (`src/core/`)

| Export | Description |
|---|---|
| `BaseEntity` | `{ id?, createdAt?, updatedAt? }` — base for all entities |
| `SimpleEntity` | `extends BaseEntity` + `name: string` |
| `NamedItem` | Minimal `{ id?, name }` for dropdown/list items |

### Entities (`src/entities/`)

| Export | Key fields |
|---|---|
| `Address` / `IAddress` | `street, city, state, country, postalCode?` + optional geo fields |
| `AddressState` / `IAddressState` | `{ id, name, countryId, countryCode }` |
| `AddressCountry` / `IAddressCountry` | `{ id, name, code }` |
| `CountryCodes` | Enum — `US, CA, MX, ES, BR, AR, CO, CL` |
| `CommonCountries` | Enum of display names |
| `Person` | `{ name, paternalSurname?, maternalSurname?, dateOfBirth?, sexId? }` |
| `Sexo` | Enum — `Hombre = 1, Mujer = 2` |
| `User` | `{ userName, name, roles?, isActive?, lastLogin? }` |
| `UserRole` | Enum — `SYSTEM, ADMIN, USER, LOCK, MANAGER` |
| `Branch` | `{ name, phone?, email?, address?, isActive }` |
| `Customer` | `{ phone, email?, person?, addresses?, isActive?, customerType? }` |
| `CustomerType` | Enum — `INDIVIDUAL = 1, BUSINESS = 2` |
| `Product` | `{ name, sku?, isActive, category?, brand?, categoryId?, brandId? }` |
| `ProductCategory` | `{ name, hasStock?, requiresProcessing?, isSupply?, brands? }` |
| `ProductBrand` | `extends SimpleEntity` |
| `ProductGroup` | `extends SimpleEntity` + `categoryId?` |

### HTTP envelopes (`src/http/`)

| Export | Description |
|---|---|
| `HttpApiResponse<T>` | Single-item response: `{ success, data?, message?, code?, ... }` |
| `HttpQueryResponse<T>` | List response: `{ success, data[], count, total? }` |
| `ResponseCode` | Enum of application-level codes (4040, 4010, 2010, …) |

---

## Usage

### Backend (Node.js / Express)

```ts
import { User, UserRole, HttpApiResponse, Branch } from '@ocramsoft/models';

// Extend the shared type with BE-specific fields
interface UserDocument extends User {
  googleId?: string;
  passwordHash?: string;
}

// Use the shared response envelope
function toResponse(user: User): HttpApiResponse<User> {
  return { success: true, data: user };
}
```

### Frontend (Angular)

```ts
import { User, UserRole, Branch, Address } from '@ocramsoft/models';

// Narrow id to required for FE use
interface AppUser extends User {
  id: string;
}

// Use the enum directly in templates or guards
if (user.roles?.includes(UserRole.ADMIN)) {
  // ...
}
```

---

## Development

```bash
npm run build        # compile src/ → dist/
npm run build:watch  # watch mode
npm run clean        # remove dist/
```

TypeScript source lives in `src/`. The compiled output in `dist/` is gitignored — consumers run the build locally. Both repos reference this package via `"@ocramsoft/models": "file:../ocramsoft_models"` in their `package.json`.

---

## Adding or updating a model

### Add a new entity

1. Create `src/entities/{name}.ts` with the shared interface (no framework-specific types).
2. Export it from `src/index.ts`.
3. Run `npm run build`.
4. Import in the consuming repo(s).
5. Bump the version — see the table below.

**Template:**

```ts
// src/entities/example.ts
import { BaseEntity } from '../core/base-entity';

export interface Example extends BaseEntity {
  name: string;
  isActive: boolean;
}

export enum ExampleStatus {
  Active = 'active',
  Inactive = 'inactive',
}
```

### Version bump policy

| Change | Bump |
|---|---|
| New file / new optional field | `patch` |
| New required field | `major` |
| Removed or renamed field | `major` |
| New enum value | `minor` |
| Removed enum value | `major` |

Run `npm version patch|minor|major` then `npm publish`.

### What belongs here vs. in each repo

| Belongs here | Stays in the repo |
|---|---|
| Interfaces used by both BE and FE | Firestore / MSSQL bindings |
| Shared enums (`UserRole`, `CustomerType`) | `IXxxRepository` interfaces |
| HTTP envelope types | Angular router/menu models |
| Common value objects (`Address`, `Person`) | Component view-models |

When in doubt: if only one repo uses the type today, keep it there until there's a real consumer on the other side.

---

## Related repositories

| Repo | Role |
|---|---|
| [ocramsoft_gateway](https://github.com/marcozam/ocramsoft_gateway) | Node.js / Express REST API |
| [lock-security-portal](https://github.com/marcozam/lock-security-portal) | Angular 20 SPA |
| [SQL](https://github.com/marcozam/SQL) | MSSQL scripts (SysMD database) |
