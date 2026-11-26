
const TodoList = require("./todo");

describe("TodoList - TDD unit tests", () => {
  let todo;

  beforeEach(() => {
    todo = new TodoList();
  });

  // Test 1: Add a task successfully
  test("adds a task with Medium priority and Pending status", () => {
    const task = todo.addTask("Complete TP");

    expect(task).toMatchObject({
      title: "Complete TP",
      priority: "Medium",
      completed: false
    });

    expect(todo.tasks).toContain(task);
  });

  // Test 2: Complete a task
  test("marks a task as completed", () => {
    const task = todo.addTask("Study JavaScript");

    expect(todo.completeTask(task.id)).toBe(true);
    expect(task.completed).toBe(true);
  });

  // Test 3: Delete a task
  test("deletes a task", () => {
    const task = todo.addTask("Do homework");

    expect(todo.deleteTask(task.id)).toBe(true);
    expect(todo.tasks).toHaveLength(0);
  });

  // Test 4: Modify task title and priority
  test("modifies task title and priority", () => {
    const task = todo.addTask("Old title");

    expect(todo.modifyTask(task.id, "New title", "High")).toBe(true);
    expect(task.title).toBe("New title");
    expect(task.priority).toBe("High");
  });

  // Test 5: Search tasks without case sensitivity
  test("searches tasks without case sensitivity", () => {
    todo.addTask("Complete TP");
    todo.addTask("Study Python");

    expect(todo.searchTasks("python").map(task => task.title))
      .toEqual(["Study Python"]);
  });

  // Test 6: Reject an empty task title
  test("rejects an empty task title", () => {
    expect(() => todo.addTask("   ")).toThrow(
      "Please enter a task title."
    );
  });

  // Test 7: Return false when a task does not exist
  test("returns false when a task does not exist", () => {
    expect(todo.deleteTask(999)).toBe(false);
    expect(todo.completeTask(999)).toBe(false);
  });

  // Test 8: Reject a non-string task title
  test("rejects a non-string task title", () => {
    expect(() => todo.addTask(123)).toThrow(
      "Please enter a task title."
    );
  });
});
