const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { add } = require("../../../controllers/contactFormActions");

// Route to get a list of items
router.post("/", add);
/* ************************************************************************* */

module.exports = router;
