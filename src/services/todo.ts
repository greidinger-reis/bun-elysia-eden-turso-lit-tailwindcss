import { db as database } from '@/db'
import { InsertTodo, todo } from '@/db/schema'
import { eq } from 'drizzle-orm'

export class TodoService {
	constructor(private db: typeof database) {}

	async findAll(authorId: string) {
		return await this.db.query.todo.findMany({
			where: (t, { eq }) => eq(t.authorId, authorId),
		})
	}

	async update(id: string, values: Partial<InsertTodo>) {
		const [updated] = await this.db.update(todo).set(values).where(eq(todo.id, id)).returning()
		return updated
	}

	async create(values: Omit<InsertTodo, 'id'>) {
		const [created] = await this.db
			.insert(todo)
			.values({
				id: crypto.randomUUID(),
				title: values.title,
				content: values.content,
				authorId: values.authorId,
			})
			.returning()

		return created
	}
}
