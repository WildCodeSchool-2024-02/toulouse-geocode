const express = require("express");

const router = express.Router();

const { browse, read, add, destroy } = require("../../../controllers/vehicleActions");
const {
  verifyToken,
  authorizeSelfOrAdminWithQueryParams,
  authorizeSelfOrAdminWithIdInBody,
  authorizeVehicleDelete,
} = require("../../../services/auth");

router.use(verifyToken);

router.get("/", authorizeSelfOrAdminWithQueryParams, browse);
router.get("/:id", authorizeSelfOrAdminWithQueryParams, read);
router.post("/", authorizeSelfOrAdminWithIdInBody, add);
router.delete("/:id", authorizeVehicleDelete, destroy);

/* ************************************************************************* */

module.exports = router;
