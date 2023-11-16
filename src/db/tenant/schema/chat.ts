import { relations } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { ticket } from './ticket'

export const chat = sqliteTable(
	'chats',
	{
		id: text('id').primaryKey().notNull(),
		ticket_id: integer('ticket_id').notNull(),
		message: text('message').notNull(),
		sender: text('status', {
			enum: ['employee', 'costomer'],
		}).notNull(),
		timestamp: integer('timestamp', { mode: 'timestamp' })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(table) => ({
		ticket_id_index: index('ticket_id_index').on(table.ticket_id),
		timestamp_index: index('timestamp_index').on(table.timestamp),
	}),
)

export const chatRelations = relations(chat, ({ one }) => ({
	ticket: one(ticket, {
		fields: [chat.ticket_id],
		references: [ticket.id],
	}),
}))

export type Chat = typeof chat.$inferSelect
