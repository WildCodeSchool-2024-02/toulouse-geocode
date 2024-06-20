const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");
const chargingStationsRouter = require("./chargingStations/router");
const clusterRouter = require("./clusters/router");

router.use("/items", itemsRouter);
router.use("/charging-stations", chargingStationsRouter);
router.use("/clusters", clusterRouter);

/* ************************************************************************* */

module.exports = router;
