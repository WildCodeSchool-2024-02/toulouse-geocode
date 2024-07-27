const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const chargingStationsRouter = require("./chargingStations/router");
const contactFormRouter = require("./contactForm/router");
const userRouter = require("./users/router");
const reservationRouter = require("./reservation/router");
const vehicleRouter = require("./vehicles/router");

router.use("/charging-stations", chargingStationsRouter);
router.use("/contact", contactFormRouter);
router.use("/contact-messages", contactFormRouter);
router.use("/user", userRouter);
router.use("/reservation", reservationRouter);
router.use("/vehicle", vehicleRouter);

/* ************************************************************************* */

module.exports = router;
