import express from 'express'
import { authenticateJwt } from '../middleware/index'
const router = express.Router()
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface CreateTodoInput {
  title: string
  description: string
}

router.post('/todos', authenticateJwt, async (req, res) => {
  const { title, description } = req.body
  const userId: any = req.headers['userId']

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title: title,
        description: description,
        published: false,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    res.status(201).json({ msg: 'Todo created successfully', newTodo })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new todo' })
  }
})

router.get('/todos', authenticateJwt, async (req, res) => {
  const userId: any = req.headers['userId']

  try {
    const todos = await prisma.todo.findMany({
      where: { id: parseInt(userId) },
    })

    res.status(200).json({ todos })
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve todos' })
  }
})

router.patch('/todos/:todoId/published', authenticateJwt, async (req, res) => {
  const { todoId } = req.params
  const userId: any = req.headers['userId']

  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(todoId),
        userId: parseInt(userId),
      },
      data: {
        published: true,
      },
    })

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' })
    }
    res.json({ msg: 'Todo updated', updatedTodo })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' })
  }
})

export default router
