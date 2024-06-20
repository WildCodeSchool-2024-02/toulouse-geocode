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
    const cluster = await tables.cluster.readBycoord(req.params.id);
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
