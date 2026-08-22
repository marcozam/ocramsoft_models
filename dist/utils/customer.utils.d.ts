import { Customer } from '../entities/customer';
/**
 * The name to show for a customer, whichever half of the polymorphic contact
 * is populated: the trade name for a business, the full person name otherwise.
 *
 * Every customer-facing surface (search results, POS header, tickets, order
 * history) goes through this instead of calling `formatPersonFullName` on
 * `customer.person` directly — a business customer has no `person`, so those
 * call sites would render an empty name.
 */
export declare function formatCustomerDisplayName(customer: Pick<Customer, 'person' | 'businessName' | 'customerType'> | null | undefined): string;
/** True when the customer is registered as a business rather than a person. */
export declare function isBusinessCustomer(customer: Pick<Customer, 'customerType'> | null | undefined): boolean;
//# sourceMappingURL=customer.utils.d.ts.map