const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { add, browse, read, destroy } = require("../../../controllers/contactFormActions");
const { verifyToken } = require("../../../services/auth");

// Route to get a list of items
router.get("/", verifyToken, browse);
router.get("/:id", verifyToken, read);
router.post("/", add);
router.delete("/:id", verifyToken, destroy);

/* ************************************************************************* */

module.exports = router;
