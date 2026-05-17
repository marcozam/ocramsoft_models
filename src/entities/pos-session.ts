import { BaseEntity } from '../core/base-entity';

export type PosSessionStatus = 'open' | 'closed' | 'suspended';

export interface PosSession extends BaseEntity {
  cashierId: string;
  cashierName?: string;
  branchId: string;
  branchName?: string;
  startTime: Date;
  initialCash: number;
  status: PosSessionStatus;
  pricingId?: string;
  stockLocationId?: string;
  transactionCount?: number;
  notes?: string;
  endTime?: Date;
  expectedCash?: number;
  finalCash?: number;
  salesCount?: number;
  totalSales?: number;
  cashDifference?: number;
}
