import {TransactionRecord} from "../records/transaction.record";

test('TransactionRecord returns data from database for one entry.', async ()=>{
    const transaction = await TransactionRecord.getOne('135');


    expect(transaction).toBeDefined();
    expect(transaction.id).toBe('135');
    expect(transaction.date).toMatchObject(new Date('2022-06-22T22:00:00.000Z'));
});

test('TransactionRecord return null from database for unexisting entry.', async ()=>{
    const transaction = await TransactionRecord.getOne('---');

    expect(transaction).toBeNull();
})