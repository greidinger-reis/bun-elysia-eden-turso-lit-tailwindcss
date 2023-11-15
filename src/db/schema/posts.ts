import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { user } from ".";

export const post = sqliteTable("post", {
    id: text("id").primaryKey().notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    slug: text("slug").unique().notNull(),
    authorId: text("author_id").notNull(),
    createdAt: integer("created_at", {
        mode: "timestamp_ms"
    }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: integer("updated_at", {
        mode: "timestamp_ms"
    }).default(sql`CURRENT_TIMESTAMP`).notNull()
})

export const postRelations = relations(post, ({one})=>({
    author: one(user, {
        fields: [post.authorId],
        references: [user.id]
    })
}))

export type Post = typeof post.$inferSelect
export type InsertPost = typeof post.$inferInsert