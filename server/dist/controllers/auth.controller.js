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
exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let users = [];
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const newUser = { id: users.length + 1, username, email, password };
        users.push(newUser);
        const token = jsonwebtoken_1.default.sign({ username, userId: newUser.id }, process.env.JWT_SECRET || "secret");
        res.status(200).json({
            message: "User Created Successfully!",
            token,
        });
    }
    catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: "Error signing up" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) {
            return res.status(401).send("Unauthorized!");
        }
        const token = jsonwebtoken_1.default.sign({ email, userId: user.id }, process.env.JWT_SECRET || "secret");
        res.status(200).json({
            message: "Login Successful!",
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.login = login;
