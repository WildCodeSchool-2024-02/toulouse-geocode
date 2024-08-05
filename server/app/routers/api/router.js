const express = require("express");

const router = express.Router();

const chargingStationsRouter = require("./chargingStations/router");
const contactFormRouter = require("./contactForm/router");
const userRouter = require("./users/router");
const reservationRouter = require("./reservations/router");
const vehicleRouter = require("./vehicles/router");

router.use("/charging-stations", chargingStationsRouter);
router.use("/contact-messages", contactFormRouter);
router.use("/users", userRouter);
router.use("/reservations", reservationRouter);
router.use("/vehicles", vehicleRouter);

module.exports = router;
