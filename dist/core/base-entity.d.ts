export interface BaseEntity {
    id?: string | number;
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
//# sourceMappingURL=base-entity.d.ts.map