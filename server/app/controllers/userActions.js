// Import access to database tables
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  // Extract the user data from the request body
  const user = req.body;

  try {
    const insertId = await tables.user.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { lastname, firstname, id, ...payload } = req.user;

    const token = jwt.sign(payload, process.env.APP_SECRET);

    res.cookie("accessToken", token);
    res.status(200).json({ firstname, lastname, id });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logged out successfully" });
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const updatedUser = await tables.user.update(id, userData);

    if (updatedUser == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    await tables.user.delete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  login,
  logout,
};
