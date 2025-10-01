"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = exports.createTodo = void 0;
var TodoStatus;
(function (TodoStatus) {
    TodoStatus["DONE"] = "\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27";
    TodoStatus["PENDING"] = "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E2A\u0E23\u0E47\u0E08";
})(TodoStatus || (TodoStatus = {}));
let todos = [];
// สร้าง Todo ใหม่
const createTodo = (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and Description are required" });
        }
        // ตรวจสอบสถานะที่รับมาจาก client
        let validStatus;
        if (status === TodoStatus.DONE || status === "เสร็จแล้ว") {
            validStatus = TodoStatus.DONE;
        }
        else {
            validStatus = TodoStatus.PENDING;
        }
        const newTodo = {
            id: Date.now(),
            title,
            description,
            status: validStatus
        };
        todos.push(newTodo);
        res.status(201).json({ message: "Todo created successfully", todo: newTodo });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.createTodo = createTodo;
const getTodos = (req, res) => {
    try {
        res.status(200).json({ todos });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.getTodos = getTodos;
