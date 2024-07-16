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

module.exports = formatFilteredPlugQuery;
