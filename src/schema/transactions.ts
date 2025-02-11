import {
  integer,
  pgTable,
  uuid,
  timestamp,
  pgEnum,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "pending",
  "approved",
  "rejected",
  "paid",
  "finished",
]);

export const TransactionsTable = pgTable("transactions", {
  id: uuid("id").primaryKey().notNull(),
  status: statusEnum().default("pending"),
  amount: integer("amount").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  finishedAt: timestamp("finishedAt"),
});
