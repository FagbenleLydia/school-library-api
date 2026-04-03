const express = require("express");
const router = express.Router();
const { validateBook, validateBorrow } = require("../middleware/validate");
const {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("../controllers/bookController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         isbn:
 *           type: string
 *         authors:
 *           type: array
 *           items:
 *             type: string
 *         status:
 *           type: string
 *           enum: [IN, OUT]
 *         borrowedBy:
 *           type: string
 *         issuedBy:
 *           type: string
 *         returnDate:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *   post:
 *     summary: Create a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               isbn:
 *                 type: string
 *               authors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of Author IDs
 *     responses:
 *       201:
 *         description: Book created
 */
router.route("/").get(getAllBooks).post(validateBook, createBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               isbn:
 *                 type: string
 *               authors:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Book updated
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 */
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

/**
 * @swagger
 * /books/{id}/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - attendantId
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: Student's ObjectId
 *               attendantId:
 *                 type: string
 *                 description: Attendant's ObjectId
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Book already borrowed
 */
router.post("/:id/borrow", validateBorrow, borrowBook);

/**
 * @swagger
 * /books/{id}/return:
 *   post:
 *     summary: Return a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Book is not currently borrowed
 */
router.post("/:id/return", returnBook);

module.exports = router;
