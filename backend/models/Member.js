const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name is required"], trim: true },
  email: { type: String, required: [true, "email is required"], unique: true, trim: true },
  phone: { type: String, trim: true },
  department: { type: String, required: [true, "department is required"], trim: true }
});

module.exports = mongoose.model("Member", memberSchema);