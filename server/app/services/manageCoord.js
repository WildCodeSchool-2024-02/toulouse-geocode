const manageCoord = (req, res, next) => {
  const { coor } = req.params;
  const arr = coor.split("§");
  const [lt1, lg1, lt2, lg2] = arr;
  req.coors = {
    lt1,
    lg1,
    lt2,
    lg2,
  };
  next();
};

module.exports = { manageCoord };
