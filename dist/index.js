"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const todoRoutes_1 = __importDefault(require("./router/todoRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/api/todos', todoRoutes_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
