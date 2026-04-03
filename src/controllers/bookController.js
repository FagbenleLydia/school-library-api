const Book = require("../models/Book");
const Author = require("../models/Author");
const Student = require("../models/Student");
const Attendant = require("../models/Attendant");

// Add a new book to the library
exports.createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

// List all books with pagination and optional title search
exports.getAllBooks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.search) {
      const searchRegex = { $regex: req.query.search, $options: "i" };

      // Find authors matching the search term
      const matchingAuthors = await Author.find({ name: searchRegex }).select(
        "_id"
      );
      const authorIds = matchingAuthors.map((a) => a._id);

      filter.$or = [{ title: searchRegex }, { authors: { $in: authorIds } }];
    }

    const [books, total] = await Promise.all([
      Book.find(filter)
        .populate("authors")
        .populate("borrowedBy")
        .populate("issuedBy")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Book.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: books.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

// Get full details for a single book, including related author/student/attendant data
exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

// Update book info (title, isbn, authors, etc.)
exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

// Remove a book from the catalogue
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, message: "Book deleted" });
  } catch (error) {
    next(error);
  }
};

// Mark a book as borrowed by a student, recorded by an attendant
exports.borrowBook = async (req, res, next) => {
  try {
    const { studentId, attendantId, returnDate } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    if (book.status === "OUT") {
      return res
        .status(400)
        .json({ success: false, message: "Book is already borrowed" });
    }

    // Make sure both the student and the attendant actually exist before we proceed
    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    const attendant = await Attendant.findById(attendantId);
    if (!attendant) {
      return res
        .status(404)
        .json({ success: false, message: "Attendant not found" });
    }

    book.status = "OUT";
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnDate = returnDate;
    await book.save();

    const populated = await Book.findById(book._id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    res.json({
      success: true,
      message: "Book borrowed successfully",
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

// Return a borrowed book — resets it back to available
exports.returnBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    if (book.status === "IN") {
      return res
        .status(400)
        .json({ success: false, message: "Book is not currently borrowed" });
    }

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;
    await book.save();

    res.json({
      success: true,
      message: "Book returned successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// Get all overdue books (borrowed books past their return date)
exports.getOverdueBooks = async (req, res, next) => {
  try {
    const books = await Book.find({
      status: "OUT",
      returnDate: { $lt: new Date() },
    })
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy")
      .sort({ returnDate: 1 });

    res.json({ success: true, count: books.length, data: books });
  } catch (error) {
    next(error);
  }
};
