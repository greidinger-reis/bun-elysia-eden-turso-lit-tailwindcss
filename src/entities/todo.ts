import { t } from 'elysia'
import { db as _db } from '@/db'
import { Entity, IEntity } from './base'
import { user } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { TodoRepository } from '@/repositories/todos-repository'

export type ITodo = NullablePartial<IEntity> & {
    title: string
    content: string | null
    completed: boolean
}

export class Todo extends Entity {
    public title: string
    public content: Option<string>
    public completed: boolean

    static override schema = t.Intersect([
        super.schema,
        t.Object({
            title: t.String(),
            content: t.String(),
            completed: t.Boolean(),
        }),
    ])

    constructor(data: ITodo) {
        const id = data.id ?? crypto.randomUUID()
        const createdAt = data.createdAt ?? new Date()
        const updatedAt = data.updatedAt ?? createdAt

        super(id, createdAt, updatedAt)

        this.title = data.title
        this.content = data.content ? Some(data.content) : None
        this.completed = data.completed
    }

    async getAuthor(repo: TodoRepository) {
        return await repo.getAuthor(this.id)
    }
}
