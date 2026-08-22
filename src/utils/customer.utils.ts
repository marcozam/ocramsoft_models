import { Customer, CustomerType } from '../entities/customer';
import { formatPersonFullName } from './person.utils';

/**
 * The name to show for a customer, whichever half of the polymorphic contact
 * is populated: the trade name for a business, the full person name otherwise.
 *
 * Every customer-facing surface (search results, POS header, tickets, order
 * history) goes through this instead of calling `formatPersonFullName` on
 * `customer.person` directly — a business customer has no `person`, so those
 * call sites would render an empty name.
 */
export function formatCustomerDisplayName(
  customer: Pick<Customer, 'person' | 'businessName' | 'customerType'> | null | undefined
): string {
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

  if (customer.customerType === CustomerType.BUSINESS) {
    return '';
  }

  return formatPersonFullName(customer.person);
}

/** True when the customer is registered as a business rather than a person. */
export function isBusinessCustomer(
  customer: Pick<Customer, 'customerType'> | null | undefined
): boolean {
  return customer?.customerType === CustomerType.BUSINESS;
}
