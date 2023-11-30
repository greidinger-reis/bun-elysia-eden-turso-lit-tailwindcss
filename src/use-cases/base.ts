export abstract class UseCase<Input, Output, Error> {
    abstract execute(input: Input): Promise<Result<Output, Error>>
}
