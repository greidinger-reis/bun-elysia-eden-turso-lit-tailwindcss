import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from ".";

export const counter = sqliteTable('counter', {
	id: text('id').notNull().primaryKey(),
	count: integer('count').notNull().default(0)
})

export const counterRelations = relations(counter, ({ one }) => ({
	owner: one(user, {
		fields: [counter.id],
		references: [user.id]
	})
}))
