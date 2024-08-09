const { JWT_SECRET_KEY } = process.env;
const { decodeToken } = require("../utils/auth.utils");

const AuthMiddleware = async (req, res, next) => {
  const TOKEN = req.header("Authorization");

  if (!TOKEN) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const TOKEN_VALUE = TOKEN.split(" ")[1];

    const decoded = await decodeToken(TOKEN_VALUE, JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = AuthMiddleware;
