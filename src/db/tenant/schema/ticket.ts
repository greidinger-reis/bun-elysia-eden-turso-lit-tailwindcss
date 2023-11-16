import { relations } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { chat } from './chat'

export const ticket = sqliteTable(
	'ticket',
	{
		id: text('id').primaryKey().notNull(),
		assigned_employee_id: text('assigned_employee_id'),
		subject: text('subject').notNull(),
		description: text('description').notNull(),
		status: text('status', {
			enum: ['open', 'closed'],
		})
			.notNull()
			.$default(() => 'open'),
		created_at: integer('created_at', { mode: 'timestamp' })
			.notNull()

			.$defaultFn(() => new Date()),
		updated_at: integer('updated_at', { mode: 'timestamp' }),
		closed_at: integer('closed_at', { mode: 'timestamp' }),
	},
	(table) => ({
		status_index: index('status_index').on(table.status),
	}),
)

export const ticketRelations = relations(ticket, ({ many }) => ({
	chats: many(chat),
}))

export type Ticket = typeof ticket.$inferSelect
