const express = require("express");

const router = express.Router();

const { browse, read, edit } = require("../../../controllers/chargingStationActions");
const {
  formatFilteredPlugQuery,
  formatLimitResultsQuery,
  formatReservationQuery,
} = require("../../../services/formatQuery");
const { authorizeAdmin, verifyToken } = require("../../../services/auth");

router.get("/", formatFilteredPlugQuery, formatReservationQuery, formatLimitResultsQuery, browse);

router.get("/:id", read);

router.put("/:id", verifyToken, authorizeAdmin, edit);

module.exports = router;
