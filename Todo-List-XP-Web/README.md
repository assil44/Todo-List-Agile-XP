# TaskFlow – To-Do List (Agile XP)

A responsive browser-based To-Do List application built with HTML, CSS and JavaScript for Practical Work No. 6 – Agile XP.

## Features
- Add and display tasks
- Modify task title and priority
- Delete tasks
- Mark tasks as completed
- Search tasks
- Filter All / Pending / Completed
- Set High, Medium or Low priority
- Save tasks in browser localStorage

## Run the application
Open `index.html` in a modern browser. No build step is needed for the app itself.

## Run TDD tests with Jest
Install Node.js, then open a terminal in this folder:

```bash
npm install
npm test
```

The tests cover adding, completing, deleting, modifying and searching tasks, as well as invalid input and missing task IDs.

## TDD – Red, Green, Refactor
1. **Red:** Write a test in `todo.test.js` first and run `npm test`. It should fail before the matching feature exists.
2. **Green:** Implement the smallest matching function in `todo.js` until the test passes.
3. **Refactor:** Improve the implementation while keeping the tests green. Run `npm test` again.

The supplied project is the completed Green/Refactor version. To demonstrate the original Red stage in your report, temporarily remove or rename the implementation of a tested method, run its test to capture the failure, then restore the method and run the passing tests.

## Project structure
- `index.html`: application structure
- `style.css`: visual design and responsive layout
- `todo.js`: task logic, separated from the interface for testing
- `app.js`: browser interaction, rendering and local storage
- `todo.test.js`: automated Jest tests
- `package.json`: test script and Jest dependency

## Suggested GitHub workflow
Create feature branches such as `feature-add-task`, `feature-complete-task`, and `feature-delete-task`. Commit and push each feature, then open at least one Pull Request into `main` and review it before merging.
