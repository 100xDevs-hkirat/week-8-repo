import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/index";
import { Todo } from "../db";
import { createTodoInputSchema, userIDSchema, todoIdSchema } from '../validator';
const router = express.Router();

interface CreateTodoInput {
  title: string;
  description: string;
}

router.post('/todos', authenticateJwt, (req, res) => {
  // validate headers and body
  const parsedBody = createTodoInputSchema.safeParse(req.body);
  const parsedHeaders = userIDSchema.safeParse(req.headers);
  if (!parsedBody.success) {
    return res.status(400).json({ error: parsedBody.error.message });
  }
  if (!parsedHeaders.success) {
    return res.status(400).json({ error: parsedHeaders.error.message });
  }

  const { title, description } = req.body;
  const done = false;
  const userId = req.headers["userId"];

  const newTodo = new Todo({ title, description, done, userId });

  newTodo.save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req, res) => {
  // validate headers
  const parsedHeaders = userIDSchema.safeParse(req.headers);
  if (!parsedHeaders.success) {
    return res.status(400).json({ error: parsedHeaders.error.message });
  }
  const userId = req.headers["userId"];

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {
  // validate headers and params
  const parsedHeaders = userIDSchema.safeParse(req.headers);
  const parsedParams = todoIdSchema.safeParse(req.params);
  if (!parsedHeaders.success) {
    return res.status(400).json({ error: parsedHeaders.error.message });
  }
  if (!parsedParams.success) {
    return res.status(400).json({ error: parsedParams.error.message });
  }

  const { todoId } = req.params;
  const userId = req.headers["userId"];

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

export default router;
