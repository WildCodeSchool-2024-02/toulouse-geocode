const manageCoord = (req, res, next) => {
  const { coor } = req.params;
  const arr = coor.split("-").map((el, i) => (i === 0 ? parseInt(el, 10) : parseFloat(el, 10)));
  const [zoom, lat, lng] = arr;

  const addOffSet = (coord, offSet) => coord + offSet;
  switch (true) {
    case zoom < 8:
      res.redirect("/api/clusters");
      break;
    case zoom < 15:
      console.info({
        latMin: addOffSet(lat, -20),
        latMax: addOffSet(lat, 20),
        lngMin: addOffSet(lng, -20),
        lngMax: addOffSet(lng, 20),
      });
      next();
      break;
    case zoom < 20:
      next();
      break;
    default:
      console.info("no coord outside range");
  }
};

module.exports = { manageCoord };
