const API_URL = "http://localhost:3000/api/todos";
const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");

// โหลด todos จาก DB
async function loadTodos() {
  todoList.innerHTML = ""; // ล้างก่อน
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();

    if (todos.length === 0) {
      todoList.innerHTML = "<li>ยังไม่มีงานในระบบ</li>";
      return;
    }

    todos.forEach(todo => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.innerHTML = `
        <span>
          <strong>${todo.title}</strong> - ${todo.description || ""}
          [${todo.status}]
        </span>
        <div class="todo-actions">
          <button onclick="markAsDone(${todo.id})">✔️ เสร็จแล้ว</button>
          <button onclick="deleteTodo(${todo.id})">🗑️ ลบ</button>
        </div>
      `;
      todoList.appendChild(li);
    });
  } catch (err) {
    console.error("โหลด todos ไม่ได้ ❌", err);
  }
}

// เพิ่ม todo
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  });

  todoForm.reset();
  loadTodos();
});

// อัพเดตเป็น DONE
async function markAsDone(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "DONE" })
  });
  loadTodos();
}

// ลบ todo
async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTodos();
}

// โหลดทันทีตอนเข้าเว็บ
loadTodos();
