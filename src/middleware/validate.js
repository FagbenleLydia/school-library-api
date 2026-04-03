const { body, validationResult } = require("express-validator");

// Checks for validation errors and bails early with a 400 if any exist
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

exports.validateAuthor = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  handleValidation,
];

exports.validateBook = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("isbn").optional().trim(),
  body("authors")
    .isArray({ min: 1 })
    .withMessage("At least one author ID is required"),
  handleValidation,
];

exports.validateStudent = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("studentId").trim().notEmpty().withMessage("Student ID is required"),
  handleValidation,
];

exports.validateAttendant = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("staffId").trim().notEmpty().withMessage("Staff ID is required"),
  handleValidation,
];

exports.validateBorrow = [
  body("studentId").notEmpty().withMessage("Student ID is required"),
  body("attendantId").notEmpty().withMessage("Attendant ID is required"),
  body("returnDate").isISO8601().withMessage("Valid return date is required"),
  handleValidation,
];
