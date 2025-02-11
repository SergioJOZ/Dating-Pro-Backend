import {
  pgTable,
  uuid,
  varchar,
  integer,
  pgEnum,
  json,
  boolean,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["client", "server"]);

export const UsersTable = pgTable("users", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  role: rolesEnum().default("client"),
  profilePic: varchar("profilePic"),
  ratings: json(),
  balance: integer("balance").default(0),
  price: integer("price").default(0),
  pendingContract: boolean("pendingContract").default(false),
  address: json(),
  bio: varchar("bio"),
});
