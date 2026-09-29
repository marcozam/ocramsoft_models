"use strict";
// src/entities/purchase-order-preview.ts
//
// Shared contract for GET /purchasing/order-preview: a suggested purchase
// order per supplier, computed from a branch's sales history, current stock,
// stock already on order and the latest purchase cost of each product.
//
// Formula, per product (d = daily demand, F = forecast per period):
//   F  = weighted average of the sales per period, most recent weighs most
//        (weights N..1 over the N periods)
//   d  = F / periodDays
//   SS = safetyFactor · σ(sales per period) · √((coverageDays + leadTimeDays) / periodDays)
//   T  = ceil(d · (coverageDays + leadTimeDays) + SS), at least minStockForActive
//        when the product sold in the history window, clamped to the
//        branch's StockMinimo / StockMaximo
//   Q  = max(0, T − (onHand + onOrder))
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=purchase-order-preview.js.map