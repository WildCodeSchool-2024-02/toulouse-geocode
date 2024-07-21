const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  add,
  login,
  destroy,
} = require("../../../controllers/userActions");
const { hashPassword, verifyPassword } = require("../../../services/auth");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

// Route to add a new item
router.post("/", hashPassword, add);

router.post("/login", verifyPassword, login);
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
