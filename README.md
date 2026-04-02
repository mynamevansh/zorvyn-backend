# 💰 Zorvyn Finance Dashboard Backend

This project is a backend system for a finance dashboard that manages financial records, user roles, and analytics. It is designed to provide secure, structured, and scalable APIs for a frontend dashboard.

---

## 🚀 Features

### 🔐 User & Role Management
- User Registration & Login (JWT Authentication)
- Role-Based Access Control (Admin, Analyst, Viewer)

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
- Monthly trends (with readable month labels)
- Recent transactions

### 🛡️ Validation & Error Handling
- Input validation using `express-validator`
- Proper error handling with status codes

### ⚡ Performance Optimization
- `.lean()` used in read queries for faster response

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- express-validator

---

## 📁 Project Structure


zorvyn-backend/
│
├── controllers/ # Business logic
├── routes/ # API routes
├── models/ # Database schemas
├── middleware/ # Auth & role middleware
├── config/ # DB connection
├── .env # Environment variables
├── app.js
└── server.js


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
- GET `/api/dashboard/trends`
- GET `/api/dashboard/recent`

---

## 🔑 Authentication

All protected routes require:


Authorization: Bearer <token>


---

## 🧠 Assumptions

- Each user can only access their own records
- Roles define access level:
  - Admin → Full access
  - Analyst/Viewer → Read-only
- Data is structured for efficient aggregation

---

## ✨ Additional Improvements

- Added pagination for scalability
- Used aggregation pipelines for analytics
- Clean API response formatting
- Optimized queries using `.lean()`

---

## 📬 Author

**Vansh Ranawat**

---

## ⭐ Conclusion

This backend is designed with scalability, security, and clean architecture in mind, making 
