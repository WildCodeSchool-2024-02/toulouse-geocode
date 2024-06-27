const argon2 = require("argon2");

const hashPassword = async (req, _, next) => {
  const user = req.body;

  const { password } = user;

  try {
    const hashedPassword = await argon2.hash(password);
    user.password = hashedPassword;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { hashPassword };
