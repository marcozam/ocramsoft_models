import { BaseEntity } from '../core/base-entity';
import { Person } from './person';
import { Address } from './address';

export enum CustomerType {
  INDIVIDUAL = 1,
  BUSINESS = 2,
}

export interface Customer extends BaseEntity {
  phone: string;
  email?: string;
  person?: Person;
  addresses?: Address[];
  isActive?: boolean;
  customerType?: CustomerType;
}
