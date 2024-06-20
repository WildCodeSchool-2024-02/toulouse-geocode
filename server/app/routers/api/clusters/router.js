const express = require("express");

const router = express.Router();

const { browse, read } = require("../../../controllers/clusterActions");
const { manageCoord } = require("../../../services/manageCoord");

router.get("/", browse);

router.get("/:coor", manageCoord, read);

/* ************************************************************************* */

module.exports = router;
