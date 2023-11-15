import { ctx } from "@/context";
import Elysia from "elysia";
import { BaseHtml } from "./base"
import { html } from "lit";

export const index = new Elysia().use(ctx).get("/", ({ render }) => {
	return render(BaseHtml(
		html`<h1>Hello World</h1>`
	))
})

