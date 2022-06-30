import {NewAdEntity, TransactionEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {OperationEntity} from "../types/transaction/operation-entity";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";



type TransactionRecordResults = [TransactionEntity[], FieldPacket[]];

export class TransactionRecord implements TransactionEntity {
    public id: string;
    public operation: OperationEntity;
    public date: Date;
    public amount: number;
    public description: string;

    constructor(obj: NewAdEntity) {
        if (obj.amount <= 0 || obj.amount > 9999999){
            throw new ValidationError('Kwota nie może być równa oraz mniejsza niż 0 lub większa niż 9999999');
        }

        if (obj.description.length > 100){
            throw new ValidationError('Opis nie może przekraczać 100 znaków.');
        }

        if (!obj.date){
            throw new ValidationError('Data nie może być pusta')
        }

        // if (!obj.operation || obj.operation !== 'income' || obj.operation !== 'expense' ){
        //     throw new ValidationError('Operacja musi być równa "income" lub "expense"')
        // }

        this.id = obj.id;
        this.operation = obj.operation;
        this.date = obj.date;
        this.amount = obj.amount;
        this.description = obj.description;

    }

    static async getOne(id: string): Promise<TransactionRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `transactions` WHERE `id` = :id", {
            id,
        }) as TransactionRecordResults;

        const [resultsSecond] = await pool.execute("SELECT * FROM `transactions` WHERE `date` < '2022-06-23'") as TransactionRecordResults;

        console.log(resultsSecond[0])
        // console.log(results[0].date.toISOString().split('T')[0])

        return results.length === 0 ? null : new TransactionRecord(results[0]);
    }

}


// data w bazie danych jest zapisywana za pomocą DATE w formacie 'rrrr-mm-dd', czyli zajmuje 10 znaków

// const myBirth = new Date(1998, 2, 10)
// wynik-> Tue Mar 10 1998 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)
// myBirth.toJSON()
// wynik-> '1998-03-09T23:00:00.000Z'
// zajmuje 24 znaki