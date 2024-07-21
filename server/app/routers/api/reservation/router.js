const express = require("express");

const router = express.Router();

const {
  add,
  browse,
  read,
  destroy,
} = require("../../../controllers/reservationActions");
const { verifyToken } = require("../../../services/auth");

router.get("/", verifyToken, browse);
router.get("/:id", read);
router.post("/", add);
router.delete("/:id", destroy);

module.exports = router;
