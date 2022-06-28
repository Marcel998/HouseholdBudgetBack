import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'household_budget',
    namedPlaceholders: true,
    decimalNumbers: true,
});
