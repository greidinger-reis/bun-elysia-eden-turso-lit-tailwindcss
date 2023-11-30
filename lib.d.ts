import { Option as _Option, Result as _Result, Ok as _Ok, Err as _Err, Some as _Some, None as _None } from 'ts-results'

/**
 * Wraps a synchronous function with a try-catch block and returns a Result type.
 * @param fn The function to wrap.
 * @returns A new function that returns a Result type.
 */
function _TrySync<T, Args extends any[]>(fn: (...args: Args) => T): (...args: Args) => Result<T, Error> {
    return (...args: Args): Result<T, Error> => {
        try {
            const result = fn(...args)
            return Ok(result)
        } catch (error) {
            return Err(error instanceof Error ? error : new Error(String(error)))
        }
    }
}

/**
 * Wraps an async function and returns a new function that returns a Promise which resolves to a Result object.
 * The Result object will contain either the resolved value of the original Promise or an Error object.
 *
 * @template T The type of the resolved value of the original Promise.
 * @template Args The types of the arguments of the original async function.
 * @param {(...args: Args) => Promise<T>} fn The original async function to wrap.
 * @returns {(...args: Args) => Promise<Result<T, Error>>} A new function that returns a Promise which resolves to a Result object.
 */
function _Try<T, Args extends any[]>(fn: (...args: Args) => Promise<T>): (...args: Args) => Promise<Result<T, Error>> {
    return async (...args: Args): Promise<Result<T, Error>> => {
        try {
            const result = await fn(...args)
            return Ok(result)
        } catch (error) {
            return Err(error instanceof Error ? error : new Error(String(error)))
        }
    }
}

declare global {
    type NullablePartial<T> = { [P in keyof T]?: T[P] | undefined | null }
    type Result<T, E> = _Result<T, E>
    type Option<T> = _Option<T>
    var Some: typeof _Some
    var None: typeof _None
    var Ok: typeof _Ok
    var Err: typeof _Err
    var TrySync: typeof _TrySync
    var Try: typeof _Try
}

global.Result = _Result
global.Option = _Option
global.Some = _Some
global.None = _None
global.Ok = _Ok
global.Err = _Err
global.TrySync = _TrySync
global.Try = _Try

export {}
