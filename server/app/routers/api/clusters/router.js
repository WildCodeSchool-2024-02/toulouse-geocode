const express = require("express");

const router = express.Router();

const { browse, read } = require("../../../controllers/clusterActions");

router.get("/", browse);

router.get("/:coor", read);

/* ************************************************************************* */

module.exports = router;
