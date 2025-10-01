"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// src/config/db.ts
const promise_1 = __importDefault(require("mysql2/promise"));
exports.pool = promise_1.default.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "todo_user",
    password: "todo_pass123",
    database: "todos_app",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
// ✅ ทดสอบว่า connect ไป DB ไหน
(async () => {
    try {
        const [rows] = await exports.pool.query("SELECT DATABASE() AS db");
        console.log("📂 Connected to DB:", rows[0].db);
    }
    catch (err) {
        console.error("❌ DB Connection failed:", err);
    }
})();
