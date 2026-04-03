const express = require("express");
const router = express.Router();
const { validateAttendant } = require("../middleware/validate");
const {
  createAttendant,
  getAllAttendants,
} = require("../controllers/attendantController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendant:
 *       type: object
 *       required:
 *         - name
 *         - staffId
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         staffId:
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
 * /attendants:
 *   get:
 *     summary: Get all attendants
 *     tags: [Attendants]
 *     responses:
 *       200:
 *         description: List of attendants
 *   post:
 *     summary: Create an attendant
 *     tags: [Attendants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - staffId
 *             properties:
 *               name:
 *                 type: string
 *               staffId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Attendant created
 */
router.route("/").get(getAllAttendants).post(validateAttendant, createAttendant);

module.exports = router;
