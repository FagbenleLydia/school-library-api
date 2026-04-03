const Attendant = require("../models/Attendant");

// Register a new library attendant
exports.createAttendant = async (req, res, next) => {
  try {
    const attendant = await Attendant.create(req.body);
    res.status(201).json({ success: true, data: attendant });
  } catch (error) {
    next(error);
  }
};

// List all attendants, newest first
exports.getAllAttendants = async (req, res, next) => {
  try {
    const attendants = await Attendant.find().sort({ createdAt: -1 });
    res.json({ success: true, count: attendants.length, data: attendants });
  } catch (error) {
    next(error);
  }
};
