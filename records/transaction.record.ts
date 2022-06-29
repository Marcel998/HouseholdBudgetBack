import {TransactionEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {OperationEntity} from "../types/transaction/operation-entity";

interface NewAdEntity extends Omit<TransactionEntity, 'id'> {
    id?: string;
}

export class TransactionRecord implements TransactionEntity {
    public id: string;
    public operation: OperationEntity;
    public date: string;
    public amount: number;
    public description: string;

    constructor(obj: NewAdEntity) {
        if (obj.amount <= 0 || obj.amount > 9999999){
            throw new ValidationError('Kwota nie może być równa oraz mniejsza niż 0 lub większa niż 9999999');
        }

        if (obj.description.length > 100){
            throw new ValidationError('Opis nie może przekraczać 100 znaków.');
        }

        if (!obj.date || obj.date.length > 10){
            throw new ValidationError('Data nie może być pusta, ani przekraczać 10 znaków')
        }

        // if (!obj.operation || obj.operation !== 'income' || obj.operation !== 'expense' ){
        //     throw new ValidationError('Operacja musi być równa "income" lub "expense"')
        // }

        this.operation = obj.operation;
        this.date = obj.date;
        this.amount = obj.amount;
        this.description = obj.description;

    }


}


// data w bazie danych jest zapisywana za pomocą DATE w formacie 'rrrr-mm-dd', czyli zajmuje 10 znaków

// const myBirth = new Date(1998, 2, 10)
// wynik-> Tue Mar 10 1998 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)
// myBirth.toJSON()
// wynik-> '1998-03-09T23:00:00.000Z'
// zajmuje 24 znaki