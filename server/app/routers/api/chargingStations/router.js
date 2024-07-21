const express = require("express");

const router = express.Router();

const { browse, read } = require("../../../controllers/chargingStationActions");
const {
  formatFilteredPlugQuery,
  formatLimitResultsQuery,
  formatReservationQuery,
} = require("../../../services/formatQuery");

router.get(
  "/",
  formatFilteredPlugQuery,
  formatReservationQuery,
  formatLimitResultsQuery,
  browse
);

router.get("/:id", read);

module.exports = router;
