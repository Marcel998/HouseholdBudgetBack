import {Router} from "express";
import {TransactionRecord} from "../records/transaction.record";

export const transactionRouter = Router()
    .get("/", async (req, res)=>{
        const transactions = await TransactionRecord.findAll();
        res.json(transactions);
    })

    .get("/:id", async (req, res)=>{
        const transaction = await TransactionRecord.getOne(req.params.id);
        res.json(transaction);
    })

    .patch("/", async (req, res)=>{
        console.log("PATCH - weszło");
        const transaction = new TransactionRecord(req.body);

        const updatedRows = await transaction.update();
        console.log({updatedRows})
        res.json(updatedRows);
    })

    .post("/", async (req, res) => {
        const transaction = new TransactionRecord(req.body);

        await transaction.insert();
        res.json(transaction);
    })
