const Author = require("../models/Author");

// Create a new author
exports.createAuthor = async (req, res, next) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json({ success: true, data: author });
  } catch (error) {
    next(error);
  }
};

// Fetch all authors, newest first
exports.getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().sort({ createdAt: -1 });
    res.json({ success: true, count: authors.length, data: authors });
  } catch (error) {
    next(error);
  }
};

// Fetch a single author by id
exports.getAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ success: false, message: "Author not found" });
    }
    res.json({ success: true, data: author });
  } catch (error) {
    next(error);
  }
};

// Update an existing author
exports.updateAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!author) {
      return res.status(404).json({ success: false, message: "Author not found" });
    }
    res.json({ success: true, data: author });
  } catch (error) {
    next(error);
  }
};

// Remove an author from the database
exports.deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ success: false, message: "Author not found" });
    }
    res.json({ success: true, message: "Author deleted" });
  } catch (error) {
    next(error);
  }
};
