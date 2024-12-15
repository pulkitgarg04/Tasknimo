import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route";
import todoRoutes from "./routes/todo.route";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;