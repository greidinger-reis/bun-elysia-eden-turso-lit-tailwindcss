import { db as _db } from '@/db'

export abstract class BaseRepository<T> {
    constructor(protected db: typeof _db) {}
    abstract create(data: T, ...rest: any): Promise<Result<T, Error>>
    abstract update(data: T, ...rest: any): Promise<Result<T, Error>>
    abstract delete(id: string, ...rest: any): Promise<Result<T, Error>>
    abstract find(id: string, ...rest: any): Promise<Option<T>>
    abstract findAll(...rest: any): Promise<T[]>
}
