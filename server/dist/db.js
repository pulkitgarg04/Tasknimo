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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getAllTodos = exports.createTodo = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (username, password, email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.create({
        data: {
            username,
            password,
            email,
        },
    });
});
exports.createUser = createUser;
const createTodo = (userId, title, description) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todo.create({
        data: {
            title,
            description,
            user: { connect: { id: userId } },
        },
    });
});
exports.createTodo = createTodo;
const getAllTodos = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            username: username,
        },
        include: {
            todos: true,
        },
    });
    if (!user) {
        throw new Error(`User with username ${username} not found`);
    }
    return user.todos;
});
exports.getAllTodos = getAllTodos;
const updateTodo = (todoId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todo.update({
        where: { id: todoId },
        data,
    });
});
exports.updateTodo = updateTodo;
const deleteTodo = (todoId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.todo.delete({
        where: { id: todoId },
    });
});
exports.deleteTodo = deleteTodo;
exports.default = prisma;
