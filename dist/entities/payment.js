"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodId = exports.PaymentMethodType = void 0;
exports.toPaymentMethodId = toPaymentMethodId;
exports.toPaymentMethodTypeById = toPaymentMethodTypeById;
var PaymentMethodType;
(function (PaymentMethodType) {
    PaymentMethodType["CASH"] = "cash";
    PaymentMethodType["CREDIT_CARD"] = "credit_card";
    PaymentMethodType["TRANSFER"] = "transfer";
    PaymentMethodType["CARD"] = "card";
})(PaymentMethodType || (exports.PaymentMethodType = PaymentMethodType = {}));
/**
 * CatMetodoPago.ID values shared across services.
 */
var PaymentMethodId;
(function (PaymentMethodId) {
    PaymentMethodId[PaymentMethodId["CASH"] = 2] = "CASH";
    PaymentMethodId[PaymentMethodId["BANK_TRANSFER"] = 3] = "BANK_TRANSFER";
    PaymentMethodId[PaymentMethodId["DEBIT_CARD"] = 5] = "DEBIT_CARD";
    PaymentMethodId[PaymentMethodId["CREDIT_CARD"] = 6] = "CREDIT_CARD";
})(PaymentMethodId || (exports.PaymentMethodId = PaymentMethodId = {}));
function toPaymentMethodId(type) {
    switch (type) {
        case PaymentMethodType.CASH:
            return PaymentMethodId.CASH;
        case PaymentMethodType.TRANSFER:
            return PaymentMethodId.BANK_TRANSFER;
        case PaymentMethodType.CARD:
            return PaymentMethodId.DEBIT_CARD;
        case PaymentMethodType.CREDIT_CARD:
            return PaymentMethodId.CREDIT_CARD;
        default:
            return PaymentMethodId.CASH;
    }
}
function toPaymentMethodTypeById(paymentMethodId) {
    switch (paymentMethodId) {
        case PaymentMethodId.CASH:
            return PaymentMethodType.CASH;
        case PaymentMethodId.BANK_TRANSFER:
            return PaymentMethodType.TRANSFER;
        case PaymentMethodId.DEBIT_CARD:
            return PaymentMethodType.CARD;
        case PaymentMethodId.CREDIT_CARD:
            return PaymentMethodType.CREDIT_CARD;
        default:
            return undefined;
    }
}
//# sourceMappingURL=payment.js.map