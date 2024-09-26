import { Request, Response } from 'express';
import {
  getTodos,
  getTodoById,
  createTodo as createTodoRepository,
  updateTodo as updateTodoRepository,
  deleteTodo as deleteTodoRepository,
} from '../repository/todoRepository';
import { Todo } from '../models/Todo';

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10; 
    const offset = parseInt(req.query.offset as string) || 0;

    const todos = await getTodos(limit, offset);
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if(isNaN(id)) {
      res.status(400).json({ error: 'Request Error' });
    }
    let todo = await getTodoById(id);
    todo = todo || {};
    res.json(todo).status(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if(typeof name !== 'string') {
      res.status(400).json({ error: 'Request Error' });
    }
    const todo: Todo = await createTodoRepository(name);
    res.json(todo).status(201);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    if(isNaN(id) || typeof name !== 'string') {
      res.status(400).json({ error: 'Request Error' });
    }
    const todo: Todo | undefined = await updateTodoRepository(id, name);
    if (todo) {
      res.json(todo).status(200);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if(isNaN(id)) {
      res.status(400).json({ error: 'Request Error' });
    }
    await deleteTodoRepository(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo };
