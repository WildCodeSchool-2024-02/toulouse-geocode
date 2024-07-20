const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
} = require("../../../controllers/chargingStationActions");
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

router.put("/:id", edit);

module.exports = router;
