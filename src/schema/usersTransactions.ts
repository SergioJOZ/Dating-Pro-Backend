import {
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { UsersTable } from "./users.ts";
import { TransactionsTable } from "./transactions.ts";

export const usersTransactionsTable = pgTable("usersTransactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  senderId: varchar("senderId")
    .notNull()
    .references(() => UsersTable.id),
  receiverId: varchar("receiverId")
    .notNull()
    .references(() => UsersTable.id),
  transactionId: uuid("transactionId")
    .notNull()
    .references(() => TransactionsTable.id),

  createdAt: timestamp("createdAt").defaultNow(),
});
