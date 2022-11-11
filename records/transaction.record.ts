import {NewAdEntity, TransactionEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {OperationEntity} from "../types/transaction/operation-entity";
import {pool} from "../utils/db";
import {FieldPacket, ResultSetHeader} from "mysql2";



type TransactionRecordResults = [TransactionEntity[], FieldPacket[]];

export class TransactionRecord implements TransactionEntity {
    public id: string;
    public operation: OperationEntity;
    public date: Date;
    public amount: number;
    public description: string;
    public categoryId: string;

    constructor(obj: NewAdEntity) {
        if (obj.amount <= 0 || obj.amount > 9999999){
            throw new ValidationError('Kwota musi być większa niż 0 oraz mniejsza niż 1000000');
        }

        if (obj.description.length > 100){
            throw new ValidationError('Opis nie może przekraczać 100 znaków.');
        }

        if (!obj.date){
            throw new ValidationError('Data nie może być pusta')
        }

        this.id = obj.id;
        this.operation = obj.operation;
        this.date = obj.date;
        this.amount = obj.amount;
        this.description = obj.description;
        this.categoryId = obj.categoryId;

    }

    static async getOne(id: string): Promise<TransactionRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `transactions` WHERE `id` = :id", {
            id,
        }) as TransactionRecordResults;

        const newResult = {
            ...results[0],
            date: new Date( results[0].date.getTime() - results[0].date.getTimezoneOffset()*60*1000),
        };

        console.log(newResult)

        return results.length === 0 ? null : new TransactionRecord(newResult);
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }else{
            throw new Error('Cannot insert something that is already inserted!')
        }

        await pool.execute("INSERT INTO `transactions`(`id`, `date`, `operation`, `description`, `amount`, `categoryId`) VALUES(:id,:date, :operation, :description, :amount, :categoryId)",
            this
        );

        return this.id;
    };

    async update(): Promise<number>{
        const result = (await pool.execute("UPDATE `transactions` SET `date` = :date, `operation` = :operation, `description` = :description, `amount`=:amount, `categoryId`=:categoryId WHERE `id` = :id",
            this
        )) as [ResultSetHeader, undefined];

        return result[0].affectedRows;
    }

    static async findAll(): Promise<TransactionEntity[]> {

        const [results] = (await pool.execute(
            "SELECT * FROM `transactions` ORDER BY `date` DESC",
        )) as TransactionRecordResults;

        const newResults = results.map(result => {
            return {
                ...result,
                date: new Date( result.date.getTime() - result.date.getTimezoneOffset()*60*1000),
            }
        });

        return newResults;
    }

}