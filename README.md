# 💰 Zorvyn Finance Dashboard Backend

This is a production-ready backend system for a finance dashboard, designed with secure authentication, role-based access control, scalable data handling, and real-time financial analytics.

---

## 🌐 Live API

Base URL:
https://zorvyn-backend-5y48.onrender.com

---

## 🌐 Live API Documentation

Access Swagger docs:

https://zorvyn-backend-5y48.onrender.com/api-docs

---

## 📄 API Documentation

https://bit.ly/48mwf5k

---

## ⚡ Quick Test Guide

1. Open Swagger docs: https://zorvyn-backend-5y48.onrender.com/api-docs
2. Register or log in to get a JWT token.
3. Click **Authorize** (top right in Swagger).
4. Enter: `Bearer <your_token>` (or paste only the token if your Swagger UI adds the `Bearer` prefix automatically).
5. Call protected endpoints directly from the documentation.

---

## ⚠️ Deployment Note

- The API is hosted on **Render** (free tier).
- The **first request after idle time** may take **30–50 seconds** while the service wakes up—this is normal cold-start behavior, not a broken API.

---

## 🚀 Features

### 🔐 User & Role Management
- User Registration & Login (JWT Authentication)
- Role-Based Access Control (Admin, Analyst, Viewer)
- **Admin role is restricted for security (prevents privilege escalation):** new registrations always receive the `viewer` role. To grant **admin** (or **analyst**), update the user document directly in MongoDB—self-service role selection is not exposed on the API.

### 💰 Financial Records
- Create, Read, Update, Delete (CRUD)
- User-specific data isolation using `createdBy`

### 🔍 Filtering & Pagination
- Filter records by:
  - Type (income/expense)
  - Category
  - Date range
- Pagination support for scalable data fetching

### 📊 Dashboard APIs
- Total Income, Expense, Net Balance
- Category-wise breakdown (income vs expense)
- **Monthly income vs expense** per calendar month (aggregated by `$month` and `type`—readable month labels, separate income and expense totals)
- Recent transactions

### 🛡️ Validation & Error Handling
- Input validation using `express-validator`
- Proper error handling with status codes

### ⚡ Performance Optimization
- **`.lean()`** on read-heavy Mongoose queries (list records, recent transactions, user listing, and updates) so plain objects are returned—less overhead than full documents, better throughput on read paths.

### 🏭 Production-Ready Operations
- **Rate limiting** (`express-rate-limit`): 100 requests per 15 minutes per IP (helps reduce abuse and automated spam).
- **Request logging** (`morgan`, `dev` format): structured HTTP logs in the console during development and debugging.

---

## 🔐 Security Considerations

- JWT-based authentication for secure access
- Role-based authorization (Admin, Analyst, Viewer)
- Admin role restricted from public registration (no privilege escalation via signup)
- Rate limiting to reduce abuse and automated spam
- Input validation (`express-validator`) to reject malformed data

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- express-validator
- `express-rate-limit` (API rate limiting)
- `morgan` (HTTP request logging)

---

## 📁 Project Structure

```text
zorvyn-backend/
│
├── controllers/       # Business logic
│   ├── userController.js
│   ├── recordController.js
│   └── dashboardController.js
│
├── routes/              # API routes
│   ├── userRoutes.js
│   ├── recordRoutes.js
│   └── dashboardRoutes.js
│
├── models/              # Database schemas
│   ├── user.js
│   └── record.js
│
├── middleware/          # Auth & role middleware
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── config/              # Database connection & Swagger
│   ├── db.js
│   └── swagger.js
│
├── .env                 # Environment variables (not committed)
├── app.js               # Express app setup
└── server.js            # Server entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

git clone https://github.com/mynamevansh/zorvyn-backend.git

cd zorvyn-backend


### 2. Install dependencies

npm install


### 3. Create `.env` file

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


### 4. Run server

npm run dev


---

## 📌 API Endpoints

### 🔐 Auth
- POST `/api/users/register`
- POST `/api/users/login`
- GET `/api/users/all` (Admin only)

---

### 💰 Records
- POST `/api/records` (Admin only)
- GET `/api/records`
- PUT `/api/records/:id` (Admin only)
- DELETE `/api/records/:id` (Admin only)

---

### 📊 Dashboard
- GET `/api/dashboard/summary`
- GET `/api/dashboard/categories`
- GET `/api/dashboard/trends` — monthly **income** vs **expense** (per month)
- GET `/api/dashboard/recent`

---

## 🔑 Authentication

This API uses JWT-based authentication.

### Step 1: Register or Login

Use the following endpoint:

`POST /api/users/login`

```json
{
  "email": "your-email@example.com",
  "password": "your-password"
}
```

### Step 2: Copy the Token

You will receive a response like:

```json
{
  "token": "your_jwt_token_here"
}
```

### Step 3: Use Token in Protected Routes

Add this header on requests to protected routes:

```
Authorization: Bearer your_jwt_token_here
```

### ⚠️ Note

- JWT tokens may expire; re-authentication is required to obtain a new token.
- If you get `401 Unauthorized`, log in again to obtain a new token.

### 💡 Tip

You can use Postman or Hoppscotch to test the APIs easily.

---

## 🧠 Assumptions

- Each user can only access their own records
- Roles define access level:
  - Admin → Full access
  - Analyst/Viewer → Read-only
- **Admin** is not selectable at signup; it is assigned only via the database.
- Data is structured for efficient aggregation

---

## ✨ Additional Improvements

- Added pagination for scalability
- Aggregation pipelines for analytics (including monthly income vs expense)
- Clean API response formatting
- **`.lean()`** for optimized read performance on list and fetch endpoints
- Rate limiting and HTTP request logging for production-style operations

---

## 🚀 Why This Project Stands Out

- Clean MVC-style layout with separation of concerns (routes, controllers, models, middleware)
- Role-based access control with deliberate security choices (e.g., admin not self-assignable at registration)
- MongoDB aggregation pipelines for realistic analytics (summaries, categories, monthly income vs expense)
- Pagination and filtering for scalable record access
- Swagger UI plus external API docs for straightforward testing
- Production-oriented practices: rate limiting, HTTP logging, and read-path optimization with `.lean()`

---

## 📌 Note for Reviewers

- No frontend is included; APIs can be tested via Swagger or Postman.
- Sample users can be created with the **register** endpoint (`POST /api/users/register`).

---

## ⭐ Conclusion

This backend is designed with scalability, security, and clean architecture in mind, making it a solid foundation for a finance dashboard and production-style API practices.

---

## 📬 Author

**Vansh Ranawat**
