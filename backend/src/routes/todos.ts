import express from 'express'
import {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/TodoController'
const router = express.Router()

router.get('/', getAllTodos)
router.get('/:id', getTodo)
router.post('/', createTodo)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router
