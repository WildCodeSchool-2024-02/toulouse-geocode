const express = require("express");

const router = express.Router();

const { browse, read, getAllDatas } = require("../../../controllers/chargingStationActions");
const formatFilteredPlugQuery = require("../../../services/formatQuery");

router.get("/", formatFilteredPlugQuery, browse);

router.get("/all-datas", getAllDatas);

router.get("/:id", read);

module.exports = router;
