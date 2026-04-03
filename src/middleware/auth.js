const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "school-library-secret";

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token invalid" });
  }
};
