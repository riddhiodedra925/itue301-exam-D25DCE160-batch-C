# ShelfSpace — Library Book Management System

**Course Project:** ITUE301 Advanced Web Development Frameworks — Set B Practical Examination  
**Stack:** React + Express.js + MongoDB + Mongoose  

---

## 📖 Overview

**ShelfSpace** is a modern, academic digital library management system built to manage books, members, and borrowing records efficiently. The project is designed with a clean React component architecture, custom Express middleware, Mongoose schema validation, and structured global error handling.

---

## 🛠️ Technology Stack

- **Frontend:** React (Vite), React Router DOM, JavaScript, Vanilla CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose (with fallback in-memory data mode)
- **Middleware:** Custom Request Logger (`requestLogger.js`), Centralized Error Handling

---

## 🚀 Setup & Execution Guide

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

The Express server runs on **http://localhost:5000**.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server runs on **http://localhost:5173**.

---

## 🌐 Environment Variables

Copy `.env.example` to `.env` in the root directory if needed:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shelfspace
```

> **Note:** If MongoDB is offline, the backend automatically operates in hybrid mode with pre-seeded sample data for live demonstration without crashing.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/books` | Returns list of all registered books | `200 OK` |
| `GET` | `/api/v1/borrowings` | Returns list of active borrowing records | `200 OK` |
| `POST` | `/api/v1/borrowings` | Creates a new borrowing record | `201 Created` |
| `POST` | `/api/v1/test-validation` | Demonstrates Mongoose validation error handling | `400 Bad Request` |

---

## 🎓 Viva-Friendly Architecture Highlights

1. **React Components & Props:** `BookCard.jsx` receives `title`, `author`, `category`, and `available` via props from `BooksPage.jsx`.
2. **React Router:** SPA navigation without page reloads using `<NavLink>` in `Navbar.jsx`.
3. **Controlled Inputs & `useState`:** `BorrowPage.jsx` updates form states (`memberName`, `bookTitle`, `borrowDate`, `returnDate`) and computes a real-time **Borrow Summary** preview on keystroke.
4. **`useEffect` & API State:** `BooksPage.jsx` manages `data`, `loading`, and `error` states during asynchronous fetch requests.
5. **Custom Middleware:** `requestLogger.js` logs HTTP requests with dynamic ISO timestamps globally (`[GET] /api/v1/books [timestamp]`).
6. **Mongoose Validation & Error Handling:** Schema validation (`enum`, `required`, `unique`) with structured error responses returning standard HTTP status codes (`200`, `201`, `400`, `500`).
