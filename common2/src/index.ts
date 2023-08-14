import { z } from "zod";

export const userObj = z.object({
    username: z.string(),
    password: z.string()
});

export type userParams = z.infer<typeof userObj>

export const todoObj = z.object({
    title: z.string(),
    description: z.string()
});

export type todoParams = z.infer<typeof todoObj>;