# 💰 Zorvyn Finance Dashboard Backend

This project is a backend system for a finance dashboard that manages financial records, user roles, and analytics. It is designed to provide secure, structured, and scalable APIs for a frontend dashboard.

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

```
zorvyn-backend/
│
├── controllers/ # Business logic
│ ├── userController.js
│ ├── recordController.js
│ └── dashboardController.js
│
├── routes/ # API routes
│ ├── userRoutes.js
│ ├── recordRoutes.js
│ └── dashboardRoutes.js
│
├── models/ # Database schemas
│ ├── user.js
│ └── record.js
│
├── middleware/ # Auth & role middleware
│ ├── authMiddleware.js
│ └── roleMiddleware.js
│
├── config/ # Database connection
│ └── db.js
│
├── .env # Environment variables
├── app.js # Express app setup
└── server.js # Server entry point

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

- Tokens may expire after some time.
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

## 📬 Author

**Vansh Ranawat**

---

## ⭐ Conclusion

This backend is designed with scalability, security, and clean architecture in mind, making it a solid foundation for a finance dashboard and production-style API practices.
