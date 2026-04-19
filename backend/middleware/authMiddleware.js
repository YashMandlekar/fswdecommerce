const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if header exists
  if (!authHeader) {
    return res.status(401).json({ msg: "No token" });
  }

  // Extract token from "Bearer TOKEN"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};