const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const chargingStations = await tables.chargingStation.readAllByFilter(req.filter);

    res.json(chargingStations);
  } catch (err) {
    next(err);
  }
};
const getAllDatas = async (req, res, next) => {
  try {
    const chargingStations =
      await tables.chargingStation.getAllChargingStationsData();

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
  getAllDatas,
};
