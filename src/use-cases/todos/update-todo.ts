import { Todo } from '@/entities/todo'
import { UseCase } from '../base'
import { TodoRepository } from '@/repositories/todos-repository'
import { type User } from 'lucia'

export enum UpdateTodoErrorReason {
    NotFound = 'TodoNotFound',
    Unauthorized = 'Unauthorized',
    UnknownError = 'UnknownError',
}

export class UpdateTodoError extends Error {
    constructor(public reason: UpdateTodoErrorReason) {
        super(`Failed to create todo: ${reason}`)
    }
}

export type UpdateTodoInput = { todo: Todo; userId: User['id'] }

export class UpdateTodo extends UseCase<UpdateTodoInput, Todo, UpdateTodoError> {
    constructor(protected readonly todoRepository: TodoRepository) {
        super()
    }

    async execute(input: UpdateTodoInput): Promise<Result<Todo, UpdateTodoError>> {
        const found = await this.todoRepository.find(input.todo.id)
        if (found.none) return Err(new UpdateTodoError(UpdateTodoErrorReason.NotFound))

        const author = await found.val.getAuthor(this.todoRepository)
        if (author.err) return Err(new UpdateTodoError(UpdateTodoErrorReason.UnknownError))

        if (author.val.id !== input.userId) return Err(new UpdateTodoError(UpdateTodoErrorReason.Unauthorized))

        const result = await this.todoRepository.update(input.todo)
        return result.mapErr(() => new UpdateTodoError(UpdateTodoErrorReason.UnknownError))
    }
}
