import Elysia from "elysia";
import { context } from "@/context";
import { counter } from '@/db/schema'
import { eq } from "drizzle-orm";

export const exampleComponentController = new Elysia({ prefix: "/exampleComponent" }).use(context).get('/counters', async (ctx) => {
	if (!ctx.session) return (ctx.set.status = 403, undefined)

	return ctx.db.query.counter.findMany({
		where: ({ id }, { eq }) => eq(id, ctx.session!.user.id)
	})
}).get('/counters/:id', async (ctx) => {
	if (!ctx.session) return ctx.redirect('/')

	const [counter] = await ctx.db.query.counter.findMany({
		where: ({ id }, { eq }) => eq(id, ctx.session!.user.id),
		limit: 1
	})

	if (!counter) return (ctx.set.status = 404, undefined)

	if (counter.id !== ctx.session!.id) return (ctx.set.status = 403, undefined)

	return counter
}).post('/counters/:id', async (ctx) => {
	if (!ctx.session) return (ctx.set.status = 403, undefined)

	const userCounters = await ctx.db.query.counter.findMany({
		where: ({ id }, { eq }) => eq(id, ctx.session!.user.id)
	})

	const counterToUpdate = userCounters.find(({ id }) => id === ctx.params.id)

	if (!counterToUpdate) return (ctx.set.status = 404, undefined)

	await ctx.db.update(counter).set({ count: counterToUpdate.count + 1 }).where(eq(counter.id, counterToUpdate.id))
})
