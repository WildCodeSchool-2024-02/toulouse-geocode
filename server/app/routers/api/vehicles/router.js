const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  destroy,
  readVehicles,
} = require("../../../controllers/vehicleActions");

router.get("/", browse);
router.get("/:id", read);
router.get("/my-vehicles/:userId", readVehicles);
router.post("/", add);
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
