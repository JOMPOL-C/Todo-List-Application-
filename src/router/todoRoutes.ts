import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo} from "../controllers/todosController";
console.log("👉 createTodo:", createTodo);
console.log("👉 getTodos:", getTodos);
console.log("👉 updateTodo:", updateTodo);
console.log("👉 deleteTodo:", deleteTodo);


const router = express.Router();

router.post("/", createTodo);    // POST /api/todos
router.get("/", getTodos);       // GET  /api/todos
router.patch("/:id", updateTodo);  // patch  /api/todos/:id
router.delete("/:id", deleteTodo);


export default router;
