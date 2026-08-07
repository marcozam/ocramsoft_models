import { BaseEntity } from '../core/base-entity';

export enum UserRole {
  SYSTEM = 'system',
  ADMIN = 'admin',
  USER = 'user',
  LOCK = 'lock',
  MANAGER = 'manager',
}

export interface User extends BaseEntity {
  userName: string;
  name: string;
  roles?: UserRole[];
  isActive?: boolean;
  lastLogin?: Date;
  accountId?: number;
}
