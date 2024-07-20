const plugList = [
  "plug_type_ef",
  "plug_type_2",
  "plug_type_combo_ccs",
  "plug_type_chademo",
  "plug_type_autre",
];

const formatFilteredPlugQuery = (req, res, next) => {
  const { filterBy } = req.query;
  const isPlugInList = () => plugList.includes(filterBy);
  req.filter = filterBy && isPlugInList() ? filterBy : "";
  next();
};

const formatLimitResultsQuery = (req, res, next) => {
  const { limit, offset } = req.query;
  const isNumber = (value) => {
    const parseValue = parseInt(value, 10);
    return !Number.isNaN(parseValue);
  };
  req.limit = limit && isNumber(limit) ? limit : "";
  req.offset = offset && isNumber(offset) ? offset : "";

  next();
};

const formatReservationQuery = (req, res, next) => {
  const { startingDate, endingDate } = req.query;

  function isDateValid(dateStr) {
    const date = new Date(dateStr);
    return !Number.isNaN(date.getTime());
  }

  req.startingDate =
    startingDate && isDateValid(startingDate) ? startingDate : "";
  req.endingDate = endingDate && isDateValid(endingDate) ? endingDate : "";

  next();
};

module.exports = {
  formatFilteredPlugQuery,
  formatLimitResultsQuery,
  formatReservationQuery,
};
