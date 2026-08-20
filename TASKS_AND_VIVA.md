# Set B Tasks and Viva Guide

## Project

**Library Book Management System**

Technology stack:

- React
- React Router
- Node.js
- Express.js
- MongoDB
- Mongoose

## Task 1 - React Component Architecture

### What the task asks

Create a basic React frontend with these pages and components:

- `HomePage`
- `BooksPage`
- `BorrowPage`
- `BookCard`

Reusable components must be inside `frontend/src/components/`, and pages must be inside `frontend/src/pages/`.

`BookCard` must receive these props:

```text
title
author
category
available
```

It must display all four values. Available and unavailable books must have different visual styles.

### What we have done

- Created `HomePage`, `BooksPage`, and `BorrowPage`.
- Created reusable `Navbar` and `BookCard` components.
- Passed book data from `BooksPage` to `BookCard` using props.
- Displayed title, author, category, and availability.
- Used different styles for `Available` and `Not Available`.

### Viva answer

A React component is a reusable part of the user interface. `BookCard` uses props because the parent owns the book data and the card only displays the values it receives.

## Task 2 - React Routing and State Management

### What the task asks

Configure React Router with these routes:

```text
/        -> HomePage
/books   -> BooksPage
/borrow  -> BorrowPage
```

Create navigation links using `Link` or `NavLink`. Do not use normal anchor navigation for these routes.

Create a controlled borrowing form with:

- Member name
- Book title
- Borrow date
- Return date

Use `useState` for the form values and display the values as they change.

### What we have done

- Configured all three required routes in `frontend/src/App.jsx`.
- Created `Navbar` using `NavLink`.
- Navigation works without a full-page reload.
- `BorrowPage` uses these state variables:

```text
memberName
selectedBook
borrowDate
returnDate
```

- All inputs use `value` and `onChange`.
- The live preview displays the current state values.
- Submitting the form prevents page reload and displays the borrowing details.

### Viva answer

React Router maps URL paths to React components. `useState` stores changing values. A controlled input receives its value from React state and updates that state through `onChange`.

## Task 3 - Express REST API and Middleware

### What the task asks

Create an Express backend with these endpoints:

```text
GET  /api/v1/books
GET  /api/v1/borrowings
POST /api/v1/borrowings
```

Use in-memory arrays for this task. Add a global request logger that prints:

```text
[METHOD] [PATH] [TIMESTAMP]
```

Add global error middleware as the final middleware. Do not send error stacks to the client.

### What we have done

- Created an in-memory `books` array in `backend/server.js`.
- Created an in-memory `borrowings` array.
- `GET /api/v1/books` returns only the in-memory `books` array.
- `GET /api/v1/borrowings` returns the in-memory borrowing records.
- `POST /api/v1/borrowings` creates a borrowing record and returns status `201`.
- Missing required fields return status `400` with JSON.
- Invalid statuses are rejected. Valid statuses are:

```text
borrowed
returned
overdue
```

- `requestLogger` runs globally before the routes.
- `errorHandler` is registered last and does not expose `error.stack`.
- CORS is enabled so the React application can call Express.

### Important separation

This route does not use MongoDB:

```text
React BooksPage
    -> GET /api/v1/books
    -> in-memory books[]
    -> JSON response
```

### Viva answer

REST is a style for exposing resources through HTTP methods and URLs. Middleware runs during the request-response process. The logger runs before routes, while error middleware is last so it can handle errors from previous middleware and routes. `200` means a successful request, `201` means a resource was created, `400` means invalid client data, and `500` means an unhandled server error.

## Task 4 - REST API Consumption in React

### What the task asks

In `BooksPage`, call:

```text
GET /api/v1/books
```

Use `fetch` and `useEffect`. Maintain these conceptual states:

```text
data
loading
error
```

Display loading, error, and successful book data states. The book information must come from the API and must not be hardcoded inside `BooksPage`.

### What we have done

- `BooksPage` calls the API inside `useEffect` when the page mounts.
- Uses `fetch` to request `/api/v1/books`.
- Maintains `data`, `loading`, and `error` using `useState`.
- Displays `Loading books...` while waiting.
- Displays an error message when the request fails.
- Renders API response data through `BookCard`.
- Displays book title, author, category, and availability.
- Uses the Vite proxy to forward `/api` requests to the backend on port `5050`.

### Viva answer

`useEffect` runs side effects such as API requests after a component renders. The API data is stored in `data`. `loading` controls the loading message, and `error` stores a failure message. The component renders the returned API data instead of hardcoded books.

## Task 5 - MongoDB, Mongoose, and Validation

### What the task asks

Create a separate MongoDB implementation using Mongoose. Define schemas for:

- Book
- Member
- Borrowing

Use `.env` for the MongoDB connection string. Demonstrate a MongoDB operation and at least one validation failure.

### What we have done

Created these models:

```text
backend/models/Book.js
backend/models/Member.js
backend/models/Borrowing.js
```

Book schema:

```text
title     -> String, required
author    -> String, required
category  -> String, required
isbn      -> String, unique
available -> Boolean, default true
```

Member schema:

```text
name       -> String, required
email      -> String, required, unique
phone      -> String
department -> String, required
```

Borrowing schema:

```text
memberId   -> ObjectId reference to Member
bookId     -> ObjectId reference to Book
borrowDate -> Required
returnDate -> Required
status     -> borrowed, returned, or overdue
```

The default borrowing status is `borrowed`.

MongoDB routes remain separate:

```text
POST /api/v1/mongodb/books
GET  /api/v1/mongodb/books
POST /api/v1/mongodb/members
POST /api/v1/mongodb/borrowings
GET  /api/v1/mongodb/borrowings
```

The connection uses:

```env
MONGO_URI=mongodb://127.0.0.1:27017/library_management
```

The backend has been verified with MongoDB connected. A book was created and retrieved successfully. Sending an empty member object returns structured validation JSON instead of the raw Mongoose error.

### Viva answer

Mongoose is an ODM that makes MongoDB documents easier to work with in JavaScript. A schema defines fields and validation rules. `required` prevents missing values, `unique` prevents duplicate values through an index, `default` supplies a value automatically, and `enum` limits values. `ref` connects an ObjectId to another Mongoose model.

## Task Separation to Remember

### Tasks 3 and 4

```text
/api/v1/books
/api/v1/borrowings
```

These use in-memory arrays. MongoDB is not involved in the React BooksPage flow.

### Task 5

```text
/api/v1/mongodb/...
```

These routes use Mongoose and MongoDB for database demonstrations and validation.

Do not say that `/api/v1/books` reads from MongoDB. It intentionally reads from the in-memory array for the examination requirement.

## How to Demonstrate the Project

### Start MongoDB Compass

Connect Compass to:

```text
mongodb://127.0.0.1:27017
```

Use the database:

```text
library_management
```

### Start the backend

```bash
cd backend
npm install
npm start
```

Expected address:

```text
http://localhost:5050
```

### Start the frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Postman Requests

### Task 3 books

```http
GET http://localhost:5050/api/v1/books
```

Expected result: the three in-memory books.

### Task 3 borrowings

```http
GET http://localhost:5050/api/v1/borrowings
```

### Task 3 create borrowing

```http
POST http://localhost:5050/api/v1/borrowings
Content-Type: application/json
```

```json
{
  "memberId": "1",
  "bookId": "1",
  "borrowDate": "2026-08-20",
  "returnDate": "2026-08-27",
  "status": "borrowed"
}
```

Expected status: `201 Created`.

### Task 5 create MongoDB book

```http
POST http://localhost:5050/api/v1/mongodb/books
Content-Type: application/json
```

```json
{
  "title": "MongoDB Basics",
  "author": "Library Demo",
  "category": "Database",
  "isbn": "9780000000099"
}
```

Then refresh Compass and open:

```text
library_management -> books
```

### Task 5 validation failure

```http
POST http://localhost:5050/api/v1/mongodb/members
Content-Type: application/json
```

```json
{}
```

Expected status: `400 Bad Request` with a structured `errors` array.

## Final Viva Checklist

- Explain the difference between props and state.
- Explain controlled inputs.
- Explain `useEffect` and API fetching.
- Explain React Router and `NavLink`.
- Explain REST endpoints and HTTP status codes.
- Explain global middleware and request logging.
- Explain why error middleware is last.
- Explain the difference between in-memory arrays and MongoDB.
- Explain each Mongoose schema field.
- Explain `required`, `unique`, `default`, `enum`, and `ref`.
- Show the three in-memory books from `/api/v1/books`.
- Show a successful MongoDB document in Compass.
- Show the validation failure response.
