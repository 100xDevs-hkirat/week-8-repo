import { z } from "zod";

export const createTodoInputSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
});
export const userIDSchema = z.object({
  userId: z.string().min(1).max(100),
});
export const todoIdSchema = z.object({
  todoId: z.string().min(1).max(100),
});
export const userInputSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1).max(1000),
});
