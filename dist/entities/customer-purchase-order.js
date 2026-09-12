"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPurchaseOrderStatus = exports.CustomerPurchaseOrderSource = void 0;
/**
 * A customer purchase order (Orden de Compra) is an inbound demand document:
 * a commitment our CUSTOMER issues to us. It is not a sale — we fulfil it with
 * one or more sale orders, which is what `linkedSaleCount` counts.
 *
 * Rows are synced from whichever channel the customer's procurement system
 * offers (see `CustomerPurchaseOrderSource`); the shape below is normalized so
 * the rest of the system never has to care which one it came from.
 */
/** Channel a purchase order arrived through. Mirrors OrdenCompraCliente.IDOrigen. */
var CustomerPurchaseOrderSource;
(function (CustomerPurchaseOrderSource) {
    /** Coupa Supplier Portal REST API (supplier.coupahost.com). */
    CustomerPurchaseOrderSource[CustomerPurchaseOrderSource["CoupaSupplierPortal"] = 1] = "CoupaSupplierPortal";
    /** The buyer's own Coupa instance via the Coupa Core API. */
    CustomerPurchaseOrderSource[CustomerPurchaseOrderSource["CoupaCoreApi"] = 2] = "CoupaCoreApi";
    /** Inbound cXML PunchOut/OrderRequest document. */
    CustomerPurchaseOrderSource[CustomerPurchaseOrderSource["Cxml"] = 3] = "Cxml";
    /** Spreadsheet export uploaded by hand. */
    CustomerPurchaseOrderSource[CustomerPurchaseOrderSource["CsvImport"] = 4] = "CsvImport";
    /** Captured directly in the ERP. */
    CustomerPurchaseOrderSource[CustomerPurchaseOrderSource["Manual"] = 5] = "Manual";
})(CustomerPurchaseOrderSource || (exports.CustomerPurchaseOrderSource = CustomerPurchaseOrderSource = {}));
/** Normalized PO status. Mirrors the CatStatus group IDUso = 404. */
var CustomerPurchaseOrderStatus;
(function (CustomerPurchaseOrderStatus) {
    /** Received, nothing fulfilled yet. */
    CustomerPurchaseOrderStatus[CustomerPurchaseOrderStatus["Open"] = 40401] = "Open";
    /** Partially fulfilled by linked sales. */
    CustomerPurchaseOrderStatus[CustomerPurchaseOrderStatus["InProgress"] = 40402] = "InProgress";
    /** Every line has stock ready to ship. */
    CustomerPurchaseOrderStatus[CustomerPurchaseOrderStatus["Ready"] = 40403] = "Ready";
    /** Fully delivered / closed at the customer. */
    CustomerPurchaseOrderStatus[CustomerPurchaseOrderStatus["Delivered"] = 40404] = "Delivered";
    CustomerPurchaseOrderStatus[CustomerPurchaseOrderStatus["Cancelled"] = 40405] = "Cancelled";
    /** buyer_hold / supplier_hold / currency_hold in the source system. */
    CustomerPurchaseOrderStatus[CustomerPurchaseOrderStatus["OnHold"] = 40406] = "OnHold";
})(CustomerPurchaseOrderStatus || (exports.CustomerPurchaseOrderStatus = CustomerPurchaseOrderStatus = {}));
//# sourceMappingURL=customer-purchase-order.js.map