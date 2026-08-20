# Library Book Management System

An exam-ready library system covering React component architecture, React Router, an Express REST API, and a separate MongoDB/Mongoose implementation.

## Technology Stack

- React and React Router
- Node.js and Express.js
- MongoDB and Mongoose
- Vite

## Project Structure

```text
frontend/                 React application
	src/components/        Navbar and reusable BookCard
	src/pages/              Home, books, and borrowing pages
backend/                  Express application
	models/                 Mongoose Book, Member, and Borrowing schemas
	middleware/             Request logger and error handler
.env.example              Required environment variable template
```

## Setup

Create a local backend environment file:

```bash
cp .env.example backend/.env
```

Then set `MONGO_URI` to a local MongoDB or MongoDB Atlas connection string. The in-memory Task 3 API works even when MongoDB is unavailable; MongoDB demo routes require a working connection.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend uses Vite's `/api` proxy, targeting `http://localhost:5050` during development. To use a different backend port, set `VITE_API_PROXY_TARGET=http://localhost:YOUR_PORT` in `frontend/.env`. For a deployed frontend, use `VITE_API_URL`.

### Backend

```bash
cd backend
npm install
npm start
```

The backend uses port `5050` when no `.env` is present, which matches the frontend development proxy. Keep the same port unless you also set `VITE_API_PROXY_TARGET` in `frontend/.env`. If port `5000` is selected and occupied, the backend retries on `5050`. `backend/.env` may contain:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5050
```

## API Testing

### Get books

```http
GET http://localhost:5050/api/v1/books
```

### Get borrowings

```http
GET http://localhost:5050/api/v1/borrowings
```

### Create a borrowing

```http
POST http://localhost:5050/api/v1/borrowings
Content-Type: application/json

{
	"memberId": "1",
	"bookId": "1",
	"borrowDate": "2026-08-20",
	"returnDate": "2026-08-27",
	"status": "borrowed"
}
```

The POST route returns `400` for missing fields or an invalid status. Successful GET requests return `200`, and a successful POST returns `201`.

## MongoDB Demonstration

### Using MongoDB Compass locally

1. Install and open MongoDB Community Server and MongoDB Compass.
2. Start the MongoDB server. Compass is the GUI client; it does not start the database server itself.
3. In Compass, connect with:

```text
mongodb://127.0.0.1:27017
```

4. Create or use a database named `library_management`.
5. Create `backend/.env` from `.env.example` and set:

```env
MONGO_URI=mongodb://127.0.0.1:27017/library_management
PORT=5050
```

6. Start the backend with `cd backend && npm start`.
7. Use Postman or Thunder Client to create a document, then refresh Compass and open the `books` collection.

For MongoDB Atlas, copy the connection string from Atlas instead of using the local URI, and replace the username, password, and database name as required.

Create a document with:

```http
POST http://localhost:5050/api/v1/mongodb/books
Content-Type: application/json

{
	"title": "The Pragmatic Programmer",
	"author": "David Thomas",
	"category": "Programming",
	"isbn": "9780135957059"
}
```

View created documents with `GET /api/v1/mongodb/books`. To demonstrate validation, send `POST /api/v1/mongodb/members` with `{}`. The response contains a structured list of validation messages. `POST` and `GET /api/v1/mongodb/borrowings` demonstrate the required Borrowing schema and populate its member and book references. MongoDB Compass or Atlas can be used to show the created document.

## VIVA EXPLANATION

1. React components are reusable UI functions. `BookCard` receives book values through props so it does not own or duplicate book data.
2. React Router maps URLs to components and `Link` changes routes without a full-page reload.
3. `useState` stores changing component data. A controlled input gets its `value` from state and updates it with `onChange`.
4. `useEffect` runs the books API request when `BooksPage` mounts. The page tracks `data`, `loading`, and `error` states.
5. The frontend calls Express with `fetch`. REST APIs expose resources through HTTP methods such as GET and POST.
6. Middleware runs during the request-response cycle. `requestLogger` runs globally before routes and prints method, path, and ISO time.
7. Error middleware is registered last so it can receive errors from all earlier routes and return JSON without exposing a stack trace.
8. Status `200` means a successful read, `201` means a resource was created, and `500` means an unhandled server error.
9. Mongoose is an ODM for MongoDB. A schema defines document fields and validation rules.
10. `required` rejects missing values, `unique` creates a uniqueness index, `default` supplies a value, and `enum` limits allowed values.
11. `ref` connects an ObjectId to another Mongoose model, such as a borrowing's member and book.
12. `.env` keeps configuration such as the database connection string outside source code. Task 3 uses arrays; Task 5 uses MongoDB schemas and operations.
13. Mongoose validation errors are caught and converted into a readable JSON response.
14. In Postman, start the backend, send the three documented requests, and inspect status codes, JSON, and the server logger output.
