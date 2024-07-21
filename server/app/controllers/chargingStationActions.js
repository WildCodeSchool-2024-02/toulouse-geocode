const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  const { limit } = req;
  const { offset } = req;
  const { filter } = req;
  const { startingDate } = req;
  const { endingDate } = req;
  const params = { limit, offset, filter, startingDate, endingDate };
  try {
    const chargingStations =
      await tables.chargingStation.readAllByFilter(params);

    res.json(chargingStations);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const chargingStation = await tables.chargingStation.read(req.params.id);
    if (chargingStation == null) {
      res.sendStatus(404);
    } else {
      res.json(chargingStation);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
};
