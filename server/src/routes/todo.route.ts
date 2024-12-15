import { Router } from "express";
import { createNewTodo, updateTodoById, getTodos, deleteTodoById } from "../controllers/todo.controller";

const todoRouter = Router();

todoRouter.post("/createTodo", createNewTodo);
todoRouter.patch("/updateTodo/:id", updateTodoById);
todoRouter.get("/getTodos", getTodos);
todoRouter.delete("/deleteTodo/:id", deleteTodoById);

export default todoRouter;