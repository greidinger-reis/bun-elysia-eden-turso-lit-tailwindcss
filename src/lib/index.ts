import { Result, Ok, Err } from 'ts-results'

/**
 * Wraps a synchronous function with a try-catch block and returns a Result type.
 * @param fn The function to wrap.
 * @returns A new function that returns a Result type.
 */
export function TrySync<T, Args extends any[]>(fn: (...args: Args) => T): (...args: Args) => Result<T, Error> {
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
export function Try<T, Args extends any[]>(
	fn: (...args: Args) => Promise<T>,
): (...args: Args) => Promise<Result<T, Error>> {
	return async (...args: Args): Promise<Result<T, Error>> => {
		try {
			const result = await fn(...args)
			return Ok(result)
		} catch (error) {
			return Err(error instanceof Error ? error : new Error(String(error)))
		}
	}
}
