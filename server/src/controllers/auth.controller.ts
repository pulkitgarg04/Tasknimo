import { Request, Response } from "express";
import jwt from "jsonwebtoken";

let users: any[] = [];

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const newUser = { id: users.length + 1, username, email, password };
    users.push(newUser);

    const token = jwt.sign(
      { username, userId: newUser.id },
      process.env.JWT_SECRET || "secret"
    );

    res.status(200).json({
      message: "User Created Successfully!",
      token,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Error signing up" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).send("Unauthorized!");
    }

    const token = jwt.sign(
      { email, userId: user.id },
      process.env.JWT_SECRET || "secret"
    );

    res.status(200).json({
      message: "Login Successful!",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
