import { Router } from "express";
import {
  createTransaction,
  getTransactionById,
  getTransactions,
  getUsersTransactionsByTransactionId,
  getUsersTransactionsByUserId,
  updateTransactionStatus,
} from "../controllers/transactionsController.ts";

const router = Router();

router.post("/transactions", createTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/id/:id", getTransactionById);
router.get(
  "/transactions/transactionId/:transactionId",
  getUsersTransactionsByTransactionId
);
router.get("/transactions/:role/userId/:userId", getUsersTransactionsByUserId);
router.put("/transactions/status/:id", updateTransactionStatus);

export default router;
