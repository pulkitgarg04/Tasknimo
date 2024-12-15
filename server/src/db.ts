import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (
  username: string,
  password: string,
  email: string
) => {
  return await prisma.user.create({
    data: {
      username,
      password,
      email,
    },
  });
};

export const createTodo = async (
  userId: number,
  title: string,
  description: string
) => {
  return await prisma.todo.create({
    data: {
      title,
      description,
      user: { connect: { id: userId } },
    },
  });
};

export const getAllTodos = async (username: string) => {
  const user = await prisma.user.findUnique({
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
};

export const updateTodo = async (todoId: number, data: Partial<Todo>) => {
  return await prisma.todo.update({
    where: { id: todoId },
    data,
  });
};

export const deleteTodo = async (todoId: number) => {
  return await prisma.todo.delete({
    where: { id: todoId },
  });
};

export default prisma;