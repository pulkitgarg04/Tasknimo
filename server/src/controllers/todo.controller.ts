import { Request, Response } from "express";
import jwt from "jsonwebtoken";

let todos: any[] = [];

export const createNewTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send("Unauthorized: Token not provided");
    }

    const decoded = jwt.decode(token) as { userId: number };
    const newTodo = {
      id: todos.length + 1,
      userId: decoded.userId,
      title,
      description,
    };
    todos.push(newTodo);

    res.status(200).json({
      data: newTodo,
      message: "New Todo Created Successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) return res.status(404).send("Todo Not Found!");

    todos[todoIndex] = { ...todos[todoIndex], title, description };

    res.status(200).send("Todo Updated Successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send("Unauthorized: Token not provided");
    }

    const decoded = jwt.decode(token) as { userId: number };
    const userTodos = todos.filter((t) => t.userId === decoded.userId);

    if (userTodos.length > 0) {
      res.status(200).json({ data: userTodos, message: "All Todos" });
    } else {
      res.status(404).send("No Todos Found!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  try {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex((t) => t.id === todoId);

    if (todoIndex === -1) return res.status(404).send("Todo Not Found!");

    todos.splice(todoIndex, 1);
    res.status(200).send("Todo Deleted Successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
