const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    delete req.body.password;
    next();
  }

  try {
    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashedPassword = hashedPassword;
    delete req.body.password;

    next();
  } catch (err) {
    next(err);
  }
};

const verifyPassword = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const user = await tables.user.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await argon2.verify(user.hashed_password, password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    req.user = user;
    delete req.user.hashed_password;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    console.info("Received token:", token);

    if (!token) {
      console.info("Token is missing");
      res.clearCookie("accessToken");

      throw new Error("No token found in cookies");
    }
    const decodedToken = jwt.verify(token, process.env.APP_SECRET);
    console.info("Decoded token:", decodedToken);

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { hashPassword, verifyPassword, verifyToken };
