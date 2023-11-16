import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from ".";

export const organizations = sqliteTable("organizations", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  database_name: text("database_name").notNull(),
  database_auth_token: text("database_auth_token").notNull(),
});

export const organizationsRelations = relations(organizations, ({ many }) => ({
  users: many(user),
}));

export type Organization = typeof organizations.$inferSelect;
export type InsertOrganization = typeof organizations.$inferInsert;