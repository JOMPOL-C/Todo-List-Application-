import express from "express";
import todoRoutes from "./router/todoRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
