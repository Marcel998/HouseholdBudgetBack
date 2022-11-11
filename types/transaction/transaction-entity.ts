import {OperationEntity} from "./operation-entity";

export interface NewAdEntity extends Omit<TransactionEntity, 'id'> {
    id?: string;
};

export interface TransactionEntity {
    id: string;
    operation: OperationEntity;
    date: Date;
    amount: number;
    description: string;
    categoryId: string;
}