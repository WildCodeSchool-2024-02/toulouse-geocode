const tables = require("../../database/tables");

const browse = async (_, res, next) => {
  try {
    const clusters = await tables.cluster.readAllGrouped();
    res.json(clusters);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { lt1, lg1, lt2, lg2 } = req.coors;
    const cluster = await tables.cluster.readBycoord(lt2, lt1, lg2, lg1);

    if (cluster == null) {
      res.sendStatus(404);
    } else {
      res.json(cluster);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
};
