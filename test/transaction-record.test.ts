import {TransactionRecord} from "../records/transaction.record";
import {OperationEntity} from "../types/transaction/operation-entity";

const defaultObj = {
    operation: OperationEntity.Expense,
    date: "2022-06-29",
    amount: 37,
    description: "GigaBuła z Adasiem",
}

test('Can build TransactionRecord', ()=>{
    const transaction = new TransactionRecord(defaultObj);

    expect(transaction.operation).toBe('expense');
    expect(transaction.amount).toBe(37);
});

test('Validates invalid amount', ()=> {
    // const transaction = new TransactionRecord({
    //     ...defaultObj,
    //     amount: 0,
    // });

    expect(()=>new TransactionRecord({
        ...defaultObj,
        amount: 0,
    })).toThrow('Kwota nie może być równa oraz mniejsza niż 0 lub większa niż 9999999');
})


// @TODO: Check all the validations