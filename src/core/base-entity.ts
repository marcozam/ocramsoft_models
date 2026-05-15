export interface BaseEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SimpleEntity extends BaseEntity {
  name: string;
}

export interface NamedItem {
  id?: string;
  name: string;
}
