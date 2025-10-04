import express from "express";
import todoRoutes from "./router/todoRoutes";
import path from "path";
import { PrismaClient } from "@prisma/client";
import methodOverride from "method-override";

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(methodOverride("_method"));

app.use("/api/todos", todoRoutes);


// ✅ static file
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ set view engine
app.set("views", path.join(__dirname, "../frontend"));
app.set("view engine", "ejs");

// ✅ หน้าแรก render พร้อม todos
app.get("/", async (req, res) => {
  try {
    const todos = await prisma.todos.findMany({
      orderBy: { id: "desc" },
    });
    res.render("index", { todos }); // 🔥 ส่ง todos เข้าไปใน index.ejs
  } catch (err) {
    res.status(500).send("❌ Failed to load todos");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
