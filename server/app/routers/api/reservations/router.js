const express = require("express");

const router = express.Router();

const { add, browse, read, destroy } = require("../../../controllers/reservationActions");
const {
  verifyToken,
  authorizeSelfOrAdminWithQueryParams,
  authorizeSelfOrAdminWithIdInBody,
  authorizeReservationDelete,
} = require("../../../services/auth");

router.use(verifyToken);

router.get("/", authorizeSelfOrAdminWithQueryParams, browse);
router.get("/:id", authorizeSelfOrAdminWithQueryParams, read);
router.post("/", authorizeSelfOrAdminWithIdInBody, add);
router.delete("/:id", authorizeReservationDelete, destroy);

module.exports = router;
