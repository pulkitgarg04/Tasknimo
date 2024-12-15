"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoById = exports.getTodos = exports.updateTodoById = exports.createNewTodo = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let todos = [];
const createNewTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).send("Unauthorized: Token not provided");
        }
        const decoded = jsonwebtoken_1.default.decode(token);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.createNewTodo = createNewTodo;
const updateTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1)
            return res.status(404).send("Todo Not Found!");
        todos[todoIndex] = Object.assign(Object.assign({}, todos[todoIndex]), { title, description });
        res.status(200).send("Todo Updated Successfully!");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.updateTodoById = updateTodoById;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).send("Unauthorized: Token not provided");
        }
        const decoded = jsonwebtoken_1.default.decode(token);
        const userTodos = todos.filter((t) => t.userId === decoded.userId);
        if (userTodos.length > 0) {
            res.status(200).json({ data: userTodos, message: "All Todos" });
        }
        else {
            res.status(404).send("No Todos Found!");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.getTodos = getTodos;
const deleteTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = parseInt(req.params.id);
        const todoIndex = todos.findIndex((t) => t.id === todoId);
        if (todoIndex === -1)
            return res.status(404).send("Todo Not Found!");
        todos.splice(todoIndex, 1);
        res.status(200).send("Todo Deleted Successfully!");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.deleteTodoById = deleteTodoById;
