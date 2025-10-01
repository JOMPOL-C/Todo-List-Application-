import express from "express";
import { createTodo, getTodos, updateTodo } from "../controllers/todosController";

const router = express.Router();

router.post("/create", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);

export default router;
