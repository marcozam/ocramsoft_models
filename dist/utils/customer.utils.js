"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCustomerDisplayName = formatCustomerDisplayName;
exports.isBusinessCustomer = isBusinessCustomer;
const customer_1 = require("../entities/customer");
const person_utils_1 = require("./person.utils");
/**
 * The name to show for a customer, whichever half of the polymorphic contact
 * is populated: the trade name for a business, the full person name otherwise.
 *
 * Every customer-facing surface (search results, POS header, tickets, order
 * history) goes through this instead of calling `formatPersonFullName` on
 * `customer.person` directly — a business customer has no `person`, so those
 * call sites would render an empty name.
 */
function formatCustomerDisplayName(customer) {
    if (!customer) {
        return '';
    }
    // Trust `businessName` over `customerType`: a row can carry the trade name
    // before the type is known (e.g. an offline draft), and a person row never
    // has one.
    const businessName = customer.businessName?.trim();
    if (businessName) {
        return businessName;
    }
    if (customer.customerType === customer_1.CustomerType.BUSINESS) {
        return '';
    }
    return (0, person_utils_1.formatPersonFullName)(customer.person);
}
/** True when the customer is registered as a business rather than a person. */
function isBusinessCustomer(customer) {
    return customer?.customerType === customer_1.CustomerType.BUSINESS;
}
//# sourceMappingURL=customer.utils.js.map