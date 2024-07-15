const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read, getAllDatas } = require("../../../controllers/chargingStationActions");

// Route to get a list of items
router.get("/", browse);

router.get("/all-datas", getAllDatas);

// Route to get a specific item by ID
router.get("/:id", read);

/* ************************************************************************* */

module.exports = router;
