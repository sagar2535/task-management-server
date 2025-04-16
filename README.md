# 📝 Task Management API

A simple and secure Task Management REST API built with **Node.js**, **Express**, and **PostgreSQL**. Features include:

- User Authentication (Register/Login)
- JWT-based Protected Routes
- CRUD operations for Tasks
- Swagger API Documentation
- Password and Email validation
- Middleware-based protection
- Pagination and Filtering for Tasks

---

## 🔐 Auth APIs

| Method | Endpoint                | Description         | Access |
| ------ | ----------------------- | ------------------- | ------ |
| POST   | `/api/v1/auth/register` | Register new user   | Public |
| POST   | `/api/v1/auth/login`    | Login existing user | Public |

## ✅ Task APIs

> All task APIs are **protected** and require a valid JWT token.

| Method | Endpoint            | Description                                          |
| ------ | ------------------- | ---------------------------------------------------- |
| GET    | `/api/v1/tasks`     | Get all tasks (with pagination, filtering by status) |
| POST   | `/api/v1/tasks`     | Create a new task                                    |
| GET    | `/api/v1/tasks/:id` | Get a specific task by ID                            |
| PATCH  | `/api/v1/tasks/:id` | Update task by ID                                    |
| DELETE | `/api/v1/tasks/:id` | Delete task by ID                                    |

## 👤 User APIs

> All user APIs are **protected** and require a valid JWT token.

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/v1/users`     | Get all users     |
| GET    | `/api/v1/users/:id` | Get user by ID    |
| PATCH  | `/api/v1/users/:id` | Update user by ID |
| DELETE | `/api/v1/users/:id` | Delete user by ID |

## 📄 Swagger Docs

All endpoints are documented using Swagger. To view the API docs, visit:

`http://localhost:3000/api-docs`

## 🛠️ Tech Stack

- Node.js
- Express.js
- PostgreSQL with Sequelize
- JWT for authentication
- Swagger for documentation

## 📦 Installation

```bash
git clone https://github.com/sagar2535/task-management-server.git
cd task-management-server
npm install
```

## 🔐 Envoriment Variables

NODE_ENV=devlopment

PORT=3000

JWT_SECRET=this is the super secretkey

JWT_EXPIRES_IN=1d

DATABASE_URL=your database url
