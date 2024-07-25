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
  // Extract the vehicle data from the request body
  const vehicle = req.body;

  try {
    // Insert the vehicle into the database
    const insertId = await tables.vehicle.create(vehicle);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted vehicle
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
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
