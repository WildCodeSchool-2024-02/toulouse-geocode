const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const reservation = await tables.reservation.readAll();

    res.json(reservation);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const reservation = await tables.reservation.read(req.params.id);
    if (reservation === null) {
      res.sendStatus(404);
    } else {
      res.json(reservation);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const reservation = req.body;
  try {
    const insertId = await tables.reservation.create(reservation);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    await tables.reservation.delete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = { add, browse, read, destroy };
