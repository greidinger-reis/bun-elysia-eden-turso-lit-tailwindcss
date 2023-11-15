import { ctx } from "@/context";
import Elysia from "elysia";

export const api = new Elysia().use(ctx)