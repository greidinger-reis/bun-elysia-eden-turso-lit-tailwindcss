import { Todo } from '@/entities/todo'
import { UseCase } from '../base'
import { TodoRepository } from '@/repositories/todos-repository'
import { type User } from 'lucia'

export enum CreateTodoErrorReason {
    InvalidInput = 'InvalidInput',
}

export class CreateTodoError extends Error {
    constructor(public reason: CreateTodoErrorReason) {
        super(`Failed to create todo: ${reason}`)
    }
}

export type CreateTodoInput = { todo: Todo; userId: User['id'] }

export class CreateTodo extends UseCase<CreateTodoInput, Todo, CreateTodoError> {
    constructor(protected readonly todoRepository: TodoRepository) {
        super()
    }

    async execute(input: CreateTodoInput): Promise<Result<Todo, CreateTodoError>> {
        const result = await this.todoRepository.create(input.todo, input.userId)
        return result.mapErr((err) => new CreateTodoError(CreateTodoErrorReason.InvalidInput))
    }
}
