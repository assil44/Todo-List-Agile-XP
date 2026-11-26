
class TodoList {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    // Validate the task title
    validateTitle(title) {
        if (typeof title !== "string" || !title.trim()) {
            throw new Error("Please enter a task title.");
        }

        return title.trim();
    }

    // Find a task by its ID
    findTask(id) {
        return this.tasks.find(task => task.id === id);
    }

    // Add a new task
    addTask(title) {
        const validTitle = this.validateTitle(title);

        const task = {
            id: this.nextId++,
            title: validTitle,
            priority: "Medium",
            completed: false
        };

        this.tasks.push(task);
        return task;
    }

    // Mark a task as completed
    completeTask(id) {
        const task = this.findTask(id);

        if (!task) return false;

        task.completed = true;
        return true;
    }

    // Delete a task
    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);

        if (index === -1) return false;

        this.tasks.splice(index, 1);
        return true;
    }

    // Modify a task title and priority
    modifyTask(id, newTitle, newPriority) {
        const task = this.findTask(id);

        if (!task) return false;

        task.title = this.validateTitle(newTitle);
        task.priority = newPriority;

        return true;
    }

    // Search tasks without case sensitivity
    searchTasks(keyword) {
        const searchTerm = String(keyword).toLowerCase();

        return this.tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm)
        );
    }
}

// Export the class for Jest and Node.js
module.exports = TodoList;
