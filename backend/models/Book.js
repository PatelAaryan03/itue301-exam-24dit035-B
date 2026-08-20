const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, "title is required"], trim: true },
  author: { type: String, required: [true, "author is required"], trim: true },
  category: { type: String, required: [true, "category is required"], trim: true },
  isbn: { type: String, unique: true, trim: true },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Book", bookSchema);