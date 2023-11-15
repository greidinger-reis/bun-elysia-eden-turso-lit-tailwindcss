import { Context } from "@/context";
import Elysia from "elysia";
import { BaseHtml } from "./base"
import { html } from "lit";

export const Index = new Elysia().use(Context).get("/", ({ render }) => {
	return render(BaseHtml(
		html`<h1>Hello World</h1>`
	))
})

