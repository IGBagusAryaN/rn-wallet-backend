import express from "express"
import { createTransactions, deleteTransactions, getTransactionsByUserId, summaryTransactionsByUser } from "../controllers/transactionsControllers.js";

const router = express.Router();

router.get("/:userId", getTransactionsByUserId);

router.post("/", createTransactions);

router.delete("/:id", deleteTransactions);

router.get("/summary/:userId", summaryTransactionsByUser);


export default router