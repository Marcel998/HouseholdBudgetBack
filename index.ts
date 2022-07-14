import express, {json, Router} from "express";
import cors from "cors";
import "express-async-errors";
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {transactionRouter} from "./routers/transaction.router";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}));

// Routes...
const router = Router();

router.use("/transaction", transactionRouter);

app.use("/api", router);

app.use(handleError);

app.listen(3001, '0.0.0.0', ()=>{
    console.log("Listening on port http://localhost:3001")
});

