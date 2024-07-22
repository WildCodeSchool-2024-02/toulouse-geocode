const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const chargingStationsRouter = require("./chargingStations/router");
const clusterRouter = require("./clusters/router");
const contactFormRouter = require("./contactForm/router");
const userRouter = require("./users/router");
const reservationRouter = require("./reservation/router");

router.use("/charging-stations", chargingStationsRouter);
router.use("/clusters", clusterRouter);
router.use("/contact", contactFormRouter);
router.use("/contact-messages", contactFormRouter);
router.use("/user", userRouter);
router.use("/reservation", reservationRouter);

/* ************************************************************************* */

module.exports = router;
