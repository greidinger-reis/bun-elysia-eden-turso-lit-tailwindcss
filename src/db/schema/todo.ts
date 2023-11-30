import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from '.'

export const todo = sqliteTable('todo', {
    id: text('id').notNull().primaryKey(),
    title: text('title').notNull(),
    content: text('content'),
    completed: integer('completed', { mode: 'boolean' }).notNull().default(false),

    authorId: text('authorId').notNull(),

    createdAt: integer('createdAt', {
        mode: 'timestamp_ms',
    })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updatedAt', {
        mode: 'timestamp_ms',
    })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
})

export const todoRelations = relations(todo, ({ one }) => ({
    owner: one(user, {
        fields: [todo.authorId],
        references: [user.id],
    }),
}))
