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
  req.filter = filterBy && isPlugInList() ? { filterBy } : "";
  next();
};

const formatLimitResultsQuery = (req, res, next) => {
  const { limit, offset } = req.query;
  const isNumber = (value) => {
    const parseValue = parseInt(value, 10);
    return !Number.isNaN(parseValue);
  };
  req.limit = limit && isNumber(limit) ? { limit } : "";
  req.offset = offset && isNumber(offset) ? { offset } : "";

  next();
};

module.exports = { formatFilteredPlugQuery, formatLimitResultsQuery };
