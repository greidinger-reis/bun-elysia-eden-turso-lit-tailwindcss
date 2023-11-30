import { Todo } from '@/entities/todo'
import { BaseRepository } from './base'
import { db as _db } from '@/db'
import { todo, user } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { type UserSchema } from 'lucia'

export class TodoRepository extends BaseRepository<Todo> {
    constructor(db: typeof _db) {
        super(db)
    }

    async create(data: Todo, authorId: string): Promise<Result<Todo, Error>> {
        return await this.db
            .insert(todo)
            .values({
                id: data.id,
                title: data.title,
                content: data.content.unwrapOr(null),
                completed: data.completed,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                authorId,
            })
            .returning()
            .then((res) => Ok(new Todo(res[0])))
            .catch((err) => Err(err as Error))
    }

    async update(data: Todo): Promise<Result<Todo, Error>> {
        return await this.db
            .update(todo)
            .set({
                title: data.title,
                content: data.content.unwrapOr(null),
                completed: data.completed,
                updatedAt: new Date(),
            })
            .returning()
            .then((res) => Ok(new Todo(res[0])))
            .catch((err) => Err(err as Error))
    }

    async delete(id: string): Promise<Result<Todo, Error>> {
        return await this.db
            .delete(todo)
            .where(eq(todo.id, id))
            .returning()
            .then((res) => Ok(new Todo(res[0])))
            .catch((err) => Err(err as Error))
    }

    async find(id: string): Promise<Option<Todo>> {
        return await this.db
            .select()
            .from(todo)
            .where(eq(todo.id, id))
            .limit(1)
            .then((res) => (res.length > 0 ? Some(new Todo(res[0])) : None))
            .catch(() => None)
    }

    async getAuthor(id: string): Promise<Result<UserSchema, Error>> {
        return await this.db
            .select()
            .from(user)
            .where(eq(user.id, id))
            .limit(1)
            .then((res) => Ok(res[0]))
            .catch((err) => Err(err as Error))
    }

    async findAll(): Promise<Todo[]> {
        return await this.db
            .select()
            .from(todo)
            .then((res) => res.map((todo) => new Todo(todo)))
    }
}
