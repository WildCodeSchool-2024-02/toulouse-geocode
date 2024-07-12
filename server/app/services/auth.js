const argon2 = require("argon2");
const tables = require("../../database/tables");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
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

module.exports = { hashPassword, verifyPassword };
