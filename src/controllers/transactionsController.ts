import { Request, Response } from "express";
import { db } from "../config/db.ts";
import { TransactionsTable } from "../schema/transactions.ts";
import { desc, eq } from "drizzle-orm";
import { PgEnum, uuid } from "drizzle-orm/pg-core";
import { usersTransactionsTable } from "../schema/usersTransactions.ts";
import { v4 as uuidv4 } from "uuid";
// Get all transactions
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await db
      .select()
      .from(TransactionsTable)
      .orderBy(desc(TransactionsTable.createdAt));
    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await db
      .select()
      .from(TransactionsTable)
      .where(eq(TransactionsTable.id, id));
    res.status(200).json(transaction);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const {
      amount,
      senderId,
      receiverId,
    }: { amount: number; senderId: string; receiverId: string } = req.body;

    const transactionId = uuidv4();
    const newTransaction = await db.insert(TransactionsTable).values({
      id: transactionId,
      amount,
    });

    const newUserTransaction = await db.insert(usersTransactionsTable).values({
      senderId,
      receiverId,
      transactionId: transactionId,
    });

    res.status(201).json({ newTransaction, newUserTransaction });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get usersTransactions by transactionId
export const getUsersTransactionsByTransactionId = async (
  req: Request,
  res: Response
) => {
  try {
    const { transactionId } = req.params;
    console.log(transactionId);
    const usersTransactions = await db
      .select()
      .from(usersTransactionsTable)
      .where(eq(usersTransactionsTable.transactionId, transactionId));
    res.status(200).json(usersTransactions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsersTransactionsByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const { role, userId } = req.params;

    if (role === "client") {
      const usersTransactions = await db
        .select()
        .from(usersTransactionsTable)
        .where(eq(usersTransactionsTable.senderId, userId))
        .orderBy(desc(usersTransactionsTable.createdAt));
      res.status(200).json(usersTransactions);
    } else if (role === "server") {
      const usersTransactions = await db
        .select()
        .from(usersTransactionsTable)
        .where(eq(usersTransactionsTable.receiverId, userId))
        .orderBy(desc(usersTransactionsTable.createdAt));
      res.status(200).json(usersTransactions);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//Update transaction status
export const updateTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id, status);
    const updatedTransaction = await db
      .update(TransactionsTable)
      .set({ status })
      .where(eq(TransactionsTable.id, id));
    res.status(200).json(updatedTransaction);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
