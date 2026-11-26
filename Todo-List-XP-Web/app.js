const todo = new TodoList();
const STORAGE_KEY = "taskflow-xp-tasks";
const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const priorityInput = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const emptyState = document.getElementById("empty-state");
let activeFilter = "All";

document.getElementById("today-date").textContent =
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date());

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    tasks: todo.tasks,
    nextId: todo.nextId
  }));
}

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.tasks)) {
      todo.tasks = saved.tasks;
      todo.nextId = saved.nextId || (Math.max(0, ...todo.tasks.map(t => t.id)) + 1);
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function renderTasks() {
  const queryResults = todo.searchTasks(searchInput.value);
  const visibleTasks = queryResults.filter(task => {
    if (activeFilter === "Pending") return !task.completed;
    if (activeFilter === "Completed") return task.completed;
    return true;
  });

  taskList.replaceChildren();
  visibleTasks.forEach(task => {
    const row = document.createElement("article");
    row.className = `task-row${task.completed ? " done" : ""}`;

    const check = document.createElement("button");
    check.className = "check-btn";
    check.type = "button";
    check.textContent = task.completed ? "✓" : "";
    check.setAttribute("aria-label", task.completed ? "Completed" : "Mark as completed");
    check.addEventListener("click", () => {
      todo.completeTask(task.id);
      saveTasks();
      renderTasks();
    });

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const priority = document.createElement("span");
    priority.className = `priority ${task.priority}`;
    priority.textContent = task.priority;

    const actions = document.createElement("div");
    actions.className = "row-actions";

    const edit = document.createElement("button");
    edit.className = "icon-btn";
    edit.type = "button";
    edit.textContent = "✎";
    edit.title = "Modify task";
    edit.setAttribute("aria-label", "Modify task");
    edit.addEventListener("click", () => modifyTask(task));

    const remove = document.createElement("button");
    remove.className = "icon-btn delete";
    remove.type = "button";
    remove.textContent = "×";
    remove.title = "Delete task";
    remove.setAttribute("aria-label", "Delete task");
    remove.addEventListener("click", () => {
      if (window.confirm(`Delete "${task.title}"?`)) {
        todo.deleteTask(task.id);
        saveTasks();
        renderTasks();
      }
    });

    actions.append(edit, remove);
    row.append(check, title, priority, actions);
    taskList.append(row);
  });

  emptyState.classList.toggle("show", visibleTasks.length === 0);
  document.getElementById("total-count").textContent = todo.tasks.length;
  document.getElementById("completed-count").textContent = todo.tasks.filter(t => t.completed).length;
  document.getElementById("pending-count").textContent = todo.tasks.filter(t => !t.completed).length;
  document.getElementById("task-counter").textContent =
    `${visibleTasks.length} ${visibleTasks.length === 1 ? "task" : "tasks"}`;
}

function modifyTask(task) {
  const newTitle = window.prompt("Edit task name:", task.title);
  if (newTitle === null) return;
  const newPriority = window.prompt("Priority: High, Medium, or Low", task.priority);
  if (newPriority === null) return;
  const normalizedPriority = newPriority.trim().toLowerCase();
  const priority = { high: "High", medium: "Medium", low: "Low" }[normalizedPriority];
  try {
    todo.modifyTask(task.id, newTitle, priority);
    saveTasks();
    renderTasks();
  } catch (error) {
    window.alert(error.message);
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  try {
    todo.addTask(titleInput.value, priorityInput.value);
    titleInput.value = "";
    priorityInput.value = "Medium";
    saveTasks();
    renderTasks();
    titleInput.focus();
  } catch (error) {
    window.alert(error.message);
  }
});

searchInput.addEventListener("input", renderTasks);

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderTasks();
  });
});

loadTasks();
renderTasks();
