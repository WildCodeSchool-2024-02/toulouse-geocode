const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  const { userId } = req.query;
  try {
    const vehicles = await tables.vehicle.readAll(userId);
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const vehicle = await tables.vehicle.read(req.params.id);
    if (vehicle == null) {
      res.sendStatus(404);
    } else {
      res.json(vehicle);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const vehicle = req.body;

  try {
    const insertId = await tables.vehicle.create(vehicle);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    await tables.vehicle.delete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  destroy,
};
