const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Validation failed (for example, missing required fields)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res
      .status(400)
      .json({ success: false, message: messages.join(", ") });
  }

  // Duplicate key - something like a repeated ISBN or email
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ");
    return res
      .status(400)
      .json({ success: false, message: `Duplicate value for: ${field}` });
  }

  // Invalid ObjectId format (for example, someone passed "abc" as an id)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  res.status(500).json({ success: false, message: "Internal server error" });
};

module.exports = errorHandler;
