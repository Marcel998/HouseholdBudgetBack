import {OperationEntity} from "./operation-entity";

export interface TransactionEntity {
    id: string;
    operation: OperationEntity;
    date: string;
    amount: number;
    description: string;
}