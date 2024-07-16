const express = require("express");

const router = express.Router();

const { browse, read } = require("../../../controllers/chargingStationActions");
const {
  formatFilteredPlugQuery,
  formatLimitResultsQuery,
} = require("../../../services/formatQuery");

router.get("/", formatFilteredPlugQuery, formatLimitResultsQuery, browse);

router.get("/:id", read);

module.exports = router;
