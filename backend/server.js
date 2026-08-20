require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Member = require("./models/Member");
const Borrowing = require("./models/Borrowing");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const configuredPort = Number(process.env.PORT) || 5050;
const books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programming", isbn: "9780132350884", available: true },
  { id: 2, title: "The Pragmatic Programmer", author: "David Thomas", category: "Programming", isbn: "9780135957059", available: false },
  { id: 3, title: "Atomic Habits", author: "James Clear", category: "Self Development", isbn: "9780735211292", available: true }
];
const borrowings = [];
const validStatuses = ["borrowed", "returned", "overdue"];

function requireDatabase(request, response, next) {
  if (mongoose.connection.readyState === 1) return next();
  return response.status(503).json({ success: false, message: "MongoDB is not connected. Set MONGO_URI and restart the backend." });
}

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/api/v1/books", (request, response) => {
  response.status(200).json({ success: true, data: books });
});
app.get("/api/v1/borrowings", (request, response) => response.status(200).json({ success: true, data: borrowings }));

app.post("/api/v1/borrowings", (request, response) => {
  const { memberId, bookId, borrowDate, returnDate, status = "borrowed" } = request.body;
  if (!memberId || !bookId || !borrowDate || !returnDate) {
    return response.status(400).json({ success: false, message: "memberId, bookId, borrowDate and returnDate are required" });
  }
  if (!validStatuses.includes(status)) {
    return response.status(400).json({ success: false, message: "status must be borrowed, returned, or overdue" });
  }
  const borrowing = { id: borrowings.length + 1, memberId, bookId, borrowDate, returnDate, status };
  borrowings.push(borrowing);
  return response.status(201).json({ success: true, data: borrowing });
});

// These routes demonstrate the separate Task 5 MongoDB implementation.
app.post("/api/v1/mongodb/books", requireDatabase, async (request, response, next) => {
  try {
    const book = await Book.create(request.body);
    return response.status(201).json({ success: true, data: book });
  } catch (error) { return next(error); }
});

app.get("/api/v1/mongodb/books", requireDatabase, async (request, response, next) => {
  try {
    const data = await Book.find().sort({ _id: -1 });
    return response.status(200).json({ success: true, data });
  } catch (error) { return next(error); }
});

app.post("/api/v1/mongodb/members", requireDatabase, async (request, response, next) => {
  try {
    const member = await Member.create(request.body);
    return response.status(201).json({ success: true, data: member });
  } catch (error) { return next(error); }
});

app.post("/api/v1/mongodb/borrowings", requireDatabase, async (request, response, next) => {
  try {
    const borrowing = await Borrowing.create(request.body);
    return response.status(201).json({ success: true, data: borrowing });
  } catch (error) { return next(error); }
});

app.get("/api/v1/mongodb/borrowings", requireDatabase, async (request, response, next) => {
  try {
    const data = await Borrowing.find().populate("memberId", "name email").populate("bookId", "title author").sort({ _id: -1 });
    return response.status(200).json({ success: true, data });
  } catch (error) { return next(error); }
});

app.use((request, response) => response.status(404).json({ success: false, message: "Route not found" }));
app.use(errorHandler);

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error(`MongoDB connection failed: ${error.message}`));
} else {
  console.warn("MONGO_URI is not configured; MongoDB demo routes are disabled.");
}

function startServer(port) {
  app.listen(port, () => console.log(`Library API running at http://localhost:${port}`)).on("error", (error) => {
    if (error.code === "EADDRINUSE" && port === 5000) {
      console.warn("Port 5000 is in use. Retrying on 5050.");
      startServer(5050);
      return;
    }
    console.error(`Server failed to start on port ${port}: ${error.message}`);
    process.exit(1);
  });
}

startServer(configuredPort);
