const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const chargingStationsRouter = require("./chargingStations/router");
const clusterRouter = require("./clusters/router");
const contactFormRouter = require("./contactForm/router");

router.use("/charging-stations", chargingStationsRouter);
router.use("/clusters", clusterRouter);
router.use("/contact", contactFormRouter);
/* ************************************************************************* */

module.exports = router;
