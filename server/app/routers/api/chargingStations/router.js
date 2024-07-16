const express = require("express");

const router = express.Router();

const { browse, read } = require("../../../controllers/chargingStationActions");
const formatFilteredPlugQuery = require("../../../services/formatQuery");

router.get("/", formatFilteredPlugQuery, browse);

router.get("/:id", read);

module.exports = router;
