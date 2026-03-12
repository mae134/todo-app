# Todo App

## Overview

A simple Todo management application.

Users can create, edit, and complete tasks through a clean UI.

Built with React, TypeScript, and json-server to implement basic CRUD operations.

## Screenshot

![Todo App](./docs/screenshot.png)

---

## Demo

Live demo: coming soon.

---

## Features

- Add tasks
- Delete tasks
- Toggle task completion
- Edit tasks
- Filter tasks (All / Active / Completed)
- Clear completed tasks
- Progress bar
- Scrollable todo list
- Loading / error states

## Tech Stack

| Technology   | Purpose                 |
| ------------ | ----------------------- |
| React        | UI                      |
| TypeScript   | Type safety             |
| Vite         | Development environment |
| Tailwind CSS | Styling                 |
| json-server  | Mock API                |
| ESLint       | Linting                 |

## Setup

### 1. Clone repository

```bash
git clone https://github.com/mae134/todo-app.git
cd todo-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Application launch

```bash
npm run app
```

## Database Utilities

### Generate sample todos

```bash
node scripts/seedDb.mjs
```

Adds sample todo data to the database.

### Reset database

```bash
node scripts/resetDb.mjs
```

Resets the database to its initial state.

## Project Structure

- `src/components`  
  UI components

- `src/hooks`  
  Custom hooks for API and state management

- `src/api`  
  API configuration

- `scripts`  
  Database utility scripts

- `docs`  
  Project screenshots

```
todo-app
├ docs
│ └ screenshot.png
├ src
│ ├ components
│ │ └ TodoItem.tsx
│ ├ hooks
│ │ └ useTodos.ts
│ ├ api
│ └ App.tsx
│
├ scripts
│ ├ seedDb.mjs
│ └ resetDb.mjs
│
├ db.example.json
├ package.json
└ README.md
```

## API

This project uses json-server as a mock API.

### GET /todos

Fetch all todos.

### POST /todos

Create a new todo.

### PATCH /todos/:id

Update a todo.

### DELETE /todos/:id

Delete a todo.

## Architecture

- React functional components
- Custom hook (useTodos) for API logic
- json-server used as a mock backend
- UI and state logic are separated into components and hooks

## Notes

The `npm run app` command starts both the API server and the frontend using `concurrently`.

If you want to run them manually:

Terminal 1

```bash
npm run api
```

Terminal 2

```bash
npm run dev
```

To generate sample todos:

```bash
node scripts/seedDb.mjs
```

After generating sample todos, refresh the browser to load the new data.

## License

This project is for learning and portfolio purposes.
