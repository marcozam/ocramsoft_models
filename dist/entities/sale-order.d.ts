import { Payment } from './payment';
import { Address } from './address';
import { BaseEntity } from '../core/base-entity';
import { MedidasArmazon, OpticaExamen } from './optica-examen';
/** Eagle-view representation of a sale order — no line items or payment breakdown. */
export interface SaleOrderSummary extends BaseEntity {
    folioNumber: number;
    dateTime: string;
    subtotal: number;
    tax: number;
    total: number;
    totalPaid: number;
    /**
     * Public GUID of the customer (Contacto.PublicId).
     * The internal numeric contact ID is never exposed by the API.
     * null = walk-in sale ("público en general").
     */
    customerId: string | null;
    customerName?: string;
    customerPhone?: string;
    branchId: number;
    branchName?: string;
    cashierId: number;
    cashierName?: string;
    statusId: number;
    statusName?: string;
    /** null = payment not yet assigned to a POS session closing */
    sessionId: number | null;
    /** Computed by the API: total - totalPaid */
    balance: number;
    /** Customer-provided reference — purchase order, contract number, etc. (max 50 chars). */
    reference?: string;
    /** Estimated delivery date promised to the customer (YYYY-MM-DD). */
    estimatedDeliveryDate?: string;
}
export interface SaleOrderItem {
    productId: number;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    comment?: string;
}
export interface SaleOrderPayment extends Payment {
    paymentId: number;
    dateTime: string;
    sessionId: number | null;
}
export interface SaleOrderComment {
    id: number;
    productId: number | null;
    comment: string;
}
export interface CreateSaleCommentRequest {
    comment: string;
}
/**
 * Full sale order.
 * When fetched with details=false only the SaleOrderSummary fields are populated.
 * When fetched with details=true the items, payments, and comments arrays are included.
 */
export interface SaleOrder extends SaleOrderSummary {
    items?: SaleOrderItem[];
    payments?: SaleOrderPayment[];
    comments?: SaleOrderComment[];
}
/** HTTP request body sent by the FE and received by the BE when creating a sale. */
export interface CreateSaleRequest {
    sessionId: string;
    branchId?: string;
    /** Public GUID of the customer (Contacto.PublicId). Omit for walk-in sales. */
    customerId?: string;
    items: SaleOrderItem[];
    payments: Payment[];
    deliveryPromise?: Date;
    deliveryAddress?: Address;
    cashierId?: string;
    cashierName?: string;
    comment?: string;
    /** Customer-provided reference — purchase order, contract number, etc. (max 50 chars). */
    reference?: string;
    /** Estimated delivery date promised to the customer (YYYY-MM-DD). */
    estimatedDeliveryDate?: string;
}
/** Extends CreateSaleRequest with optica exam linkage fields. */
export interface CreateOpticaSaleRequest extends CreateSaleRequest {
    examenId: string;
    tipoMicaId: string;
    materialId: string;
    frameMeasurements?: MedidasArmazon;
}
/**
 * Sale order enriched with the optica exam linked at sale time (OpticaExamenVenta).
 * examen is null when the sale has no exam linked.
 */
export interface OpticaSaleOrder extends SaleOrder {
    examen: OpticaExamen | null;
}
/** HTTP request body to register payments for an existing sale order. */
export interface RegisterSalePaymentsRequest {
    sessionId: number;
    payments: Payment[];
}
/** Response data returned after registering payments for a sale. */
export interface RegisterSalePaymentsData {
    saleId: string;
    registeredPayments: number;
    totalAmount: number;
}
//# sourceMappingURL=sale-order.d.ts.map