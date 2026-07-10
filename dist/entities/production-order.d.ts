import { BaseEntity } from '../core/base-entity';
/**
 * Production order statuses — CatStatus usage group 403 (IDUso = 403).
 * Values are the CatStatus IDs seeded by
 * SQL_Scripts/08_Inventario/004_OrdenProduccion/OrdenProduccion_01_InitialData.sql
 */
export declare enum ProductionOrderStatus {
    Requested = 40301,
    InProduction = 40302,
    Completed = 40303,
    Cancelled = 40304
}
/** Eagle-view representation of a production order — no line items or batch log. */
export interface ProductionOrderSummary extends BaseEntity {
    dateTime: string;
    locationId: number;
    locationName?: string;
    statusId: number;
    statusName?: string;
    /** Phase 2: sale order that originated this production order. null = manual order. */
    saleOrderId: number | null;
    /** ISO date (YYYY-MM-DD). null = no promised completion date. */
    promisedDate: string | null;
    createdById: number;
    createdByName?: string;
    notes?: string;
    /** Number of distinct products in the order. */
    productCount: number;
    /** Sum of requested quantities across all lines. */
    requestedQuantity: number;
    /** Sum of reported output batches across all lines. */
    producedQuantity: number;
}
export interface ProductionOrderItem {
    productId: number;
    description: string;
    requestedQuantity: number;
    producedQuantity: number;
    /** Computed: requestedQuantity - producedQuantity */
    pendingQuantity: number;
}
/** One reported output batch (append-only log entry). */
export interface ProductionOrderProgressEntry {
    entryId: number;
    productId: number;
    description: string;
    quantity: number;
    dateTime: string;
    userId: number;
    userName?: string;
    notes?: string;
}
/**
 * Full production order.
 * When fetched with details=false only the ProductionOrderSummary fields are populated.
 * When fetched with details=true the items and progress arrays are included.
 */
export interface ProductionOrder extends ProductionOrderSummary {
    items?: ProductionOrderItem[];
    progress?: ProductionOrderProgressEntry[];
}
/** HTTP request body sent by the FE and received by the BE when creating a production order. */
export interface CreateProductionOrderRequest {
    locationId: number;
    items: {
        productId: number;
        quantity: number;
    }[];
    /** ISO date (YYYY-MM-DD). */
    promisedDate?: string;
    notes?: string;
}
/** HTTP request body to report one output batch for a production order. */
export interface RegisterProductionOutputRequest {
    productId: number;
    quantity: number;
    notes?: string;
}
/** HTTP request body to transition a production order's status. */
export interface UpdateProductionOrderStatusRequest {
    statusId: ProductionOrderStatus;
    comment?: string;
}
//# sourceMappingURL=production-order.d.ts.map