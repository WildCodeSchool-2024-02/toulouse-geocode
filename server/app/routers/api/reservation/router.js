const express = require("express");

const router = express.Router();

const { add, browse, read, destroy } = require("../../../controllers/reservationActions");

router.get("/", browse);
router.get("/:id", read);
router.post("/", add);
router.delete("/:id", destroy);

module.exports = router;
