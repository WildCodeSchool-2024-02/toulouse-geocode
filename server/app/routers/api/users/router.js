const express = require("express");

const router = express.Router();

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
  authorizeAdmin,
  authorizeSelfOrAdmin,
} = require("../../../services/auth");

router.get("/", verifyToken, authorizeAdmin, browse);
router.get("/:id", verifyToken, authorizeSelfOrAdmin, read);
router.post("/", hashPassword, add);
router.delete("/:id", verifyToken, authorizeSelfOrAdmin, destroy);
router.put("/:id", verifyToken, authorizeSelfOrAdmin, hashPassword, edit);
router.post("/login", verifyPassword, login);
router.post("/logout", logout);

module.exports = router;
