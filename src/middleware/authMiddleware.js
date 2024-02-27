require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");

  if (!token) {
    throw new Error("Not authorized");
  }

  if (!tokenType) {
    throw new Error("Not authorized");
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);

    console.log(user);

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
};

module.exports = authMiddleware;
