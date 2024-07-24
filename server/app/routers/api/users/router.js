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
  logout,
  destroy,
  edit,
} = require("../../../controllers/userActions");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("../../../services/auth");

router.get("/", verifyToken, browse);
router.get("/:id", verifyToken, read);
router.post("/", hashPassword, add);
router.delete("/:id", verifyToken, destroy);
router.put("/:id", verifyToken, hashPassword, edit);
router.post("/login", verifyPassword, login);
router.post("/logout", logout);

/* ************************************************************************* */

module.exports = router;
