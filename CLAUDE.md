# ocramsoft_models — Shared Models Subagent

This repo is the **single source of truth** for TypeScript interfaces, enums, and HTTP envelope types shared between the POS system's backend (`ocramsoft_gateway`) and frontend (`lock-security-portal`).

Package name: `@ocramsoft/models`  
Consumed by: BE via `import { ... } from '@ocramsoft/models'` | FE via the same import  
Dev reference: `"@ocramsoft/models": "file:../ocramsoft_models"` in both `package.json` files

---

## Repo Structure

```
src/
  core/
    base-entity.ts      # BaseEntity, NamedItem, Address
  entities/
    user.ts             # User interface + UserRole enum
    branch.ts           # Branch interface
    product.ts          # Product interface
    customer.ts         # Customer interface
    # one file per domain entity
  http/
    api-response.ts     # HttpApiResponse<T> + HttpQueryResponse<T>
  index.ts              # barrel — re-exports everything public
dist/                   # compiled output — DO NOT edit manually
```

---

## Decision Rule: Does a Model Belong Here?

Ask these questions in order:

1. **Is it consumed by both BE and FE?** → Yes = belongs here. No = keep it in its repo.
2. **Is it tied to a framework?** Angular router config, Firestore document shapes, Express request decorators → keep in that repo.
3. **Is it a view-model or UI state?** → Keep in FE.
4. **Is it a repository interface (`IXxxRepository`)?** → Keep in BE.

If in doubt, keep it in the originating repo until there is a real consumer on the other side.

---

## How to Add a New Shared Model

1. Create `src/entities/{entity-name}.ts` (or `src/core/` for base types).
2. Define only what is genuinely shared — no Firestore types, no Angular decorators.
3. Export from `src/index.ts`.
4. Bump the package version: **patch** for new file, **minor** for new optional field on existing type.
5. Run `npm run build` — verify `dist/` is updated.
6. Update the consuming repo(s): re-run `npm install` and replace the local model import.

### Template for a new entity file

```ts
// src/entities/example.ts

export interface Example {
  id: string;
  name: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum ExampleStatus {
  Active = 'active',
  Inactive = 'inactive',
}
```

Then in `src/index.ts`:

```ts
export * from './entities/example';
```

---

## How to Update an Existing Model

| Change type | Version bump | Extra steps |
|---|---|---|
| Add optional field | Minor (`x.Y.z`) | None — backward compatible |
| Add required field | Major (`X.y.z`) | Must update BE and FE in same sprint |
| Remove or rename field | Major (`X.y.z`) | Coordinate BE and FE PRs before publish |
| Add enum value | Minor | Check FE switch/case exhaustiveness |
| Remove enum value | Major | Full audit of BE and FE usages first |

**Never publish a major version without confirming both BE and FE are updated.**

---

## How BE Consumes This Package

```ts
// ocramsoft_gateway — extend shared type for BE-specific fields
import { Branch } from '@ocramsoft/models';

interface BranchDocument extends Branch {
  firestoreDocId: string; // BE-only
}
```

Repository interfaces and request DTOs stay in the BE. Only the core entity shape comes from here.

---

## How FE Consumes This Package

```ts
// lock-security-portal — use directly or extend for FE view-model
import { User, UserRole } from '@ocramsoft/models';

interface UserListItem extends User {
  displayLabel: string; // FE-only computed field
}
```

Angular-specific types (router config, menu items, signal state) stay in the FE.

---

## HTTP Envelope Types

`HttpApiResponse<T>` and `HttpQueryResponse<T>` live in `src/http/api-response.ts`. These mirror the BE response format and the FE `BaseRepository` unwrapping logic. Any change to these types requires updating both the BE response builders and the FE `BaseRepository`.

---

## Build & Publish

```bash
npm run build          # compiles to dist/
npm version patch      # or minor / major
npm publish            # publishes to npm (or GitHub Packages)
```

During local development both repos use `"@ocramsoft/models": "file:../ocramsoft_models"`. After `npm install`, changes in `src/` are not picked up until `npm run build` is re-run in this repo.

---

## What NOT to Put Here

- Firestore document schemas or MSSQL column mappings
- `IXxxRepository` interfaces
- Express/class-validator decorators
- Angular `Routes`, `MenuItems`, or component view-models
- `OfflineCacheService` state shapes
- Any type that is only used in one repo

---

## Related Repos

| Repo | Role | Key arch doc |
|---|---|---|
| `ocramsoft_gateway/` | Node.js/Express BE | `ARCHITECTURE.md` |
| `lock-security-portal/` | Angular 20 FE | `architecture.md` |
| `SQL/` | MSSQL scripts | — |
