import express from "express";
import { authenticateJwt, SECRET } from "../middleware/index";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

interface CreateTodoInput {
  title: string;
  description: string;
}

router.post("/todos", authenticateJwt, async (req, res) => {
  const { title, description } = req.body;
  const done = false;
  const userId: any = req.headers["userId"];
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        done,
        userId,
      },
    });
    res.status(201).json(newTodo);
  } catch (e) {
    res.status(500).json({ error: "Failed to create a new todo" });
  }
});

router.get("/todos", authenticateJwt, async (req, res) => {
  const userId: any = req.headers["userId"];

  try {
    const todos = await prisma.todo.findMany({
      where: { userId: parseInt(userId) },
    });
    res.json(todos);
  } catch (e) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
});

router.patch("/todos/:todoId/done", authenticateJwt, async (req, res) => {
  const { todoId } = req.params;
  const userId: any = req.headers["userId"];

  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(todoId),
        userId: parseInt(userId),
      },
      data: {
        done: true,
      },
    });
    
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (e) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

export default router;
