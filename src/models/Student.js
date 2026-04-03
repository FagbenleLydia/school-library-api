const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    studentId: {
      type: String,
      unique: true,
      required: [true, "Student ID is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
