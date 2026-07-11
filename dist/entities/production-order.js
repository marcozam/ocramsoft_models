"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionOrderStatus = void 0;
/**
 * Production order statuses — CatStatus usage group 403 (IDUso = 403).
 * Values are the CatStatus IDs seeded by
 * SQL_Scripts/08_Inventario/004_OrdenProduccion/OrdenProduccion_01_InitialData.sql
 */
var ProductionOrderStatus;
(function (ProductionOrderStatus) {
    ProductionOrderStatus[ProductionOrderStatus["Requested"] = 40301] = "Requested";
    ProductionOrderStatus[ProductionOrderStatus["InProduction"] = 40302] = "InProduction";
    ProductionOrderStatus[ProductionOrderStatus["Completed"] = 40303] = "Completed";
    ProductionOrderStatus[ProductionOrderStatus["Cancelled"] = 40304] = "Cancelled";
})(ProductionOrderStatus || (exports.ProductionOrderStatus = ProductionOrderStatus = {}));
//# sourceMappingURL=production-order.js.map