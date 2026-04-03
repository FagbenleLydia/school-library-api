const express = require("express");
const router = express.Router();
const { validateStudent } = require("../middleware/validate");
const {
  createStudent,
  getAllStudents,
  getStudent,
} = require("../controllers/studentController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - studentId
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         studentId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *   post:
 *     summary: Create a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - studentId
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               studentId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created
 */
router.route("/").get(getAllStudents).post(validateStudent, createStudent);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 */
router.route("/:id").get(getStudent);

module.exports = router;
