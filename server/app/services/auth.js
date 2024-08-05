const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    delete req.body.password;
    next();
    return;
  }

  try {
    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashedPassword = hashedPassword;
    delete req.body.password;

    next();
  } catch (err) {
    next(err);
  }
};

const verifyPassword = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const user = await tables.user.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await argon2.verify(user.hashed_password, password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    req.user = user;
    delete req.user.hashed_password;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    console.info("Received token:", token);

    if (!token) {
      console.info("Token is missing");
      res.clearCookie("accessToken");

      throw new Error("No token found in cookies");
    }
    const decodedToken = jwt.verify(token, process.env.APP_SECRET);
    console.info("Decoded token:", decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.isAdmin !== 1) {
    return res.status(403).json({ error: "Forbidden: Admin access required" });
  }
  return next();
};

const authorizeSelfOrAdmin = (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  if (req.user.isAdmin !== 1 && req.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden: Access denied" });
  }
  return next();
};

const authorizeSelfOrAdminWithQueryParams = (req, res, next) => {
  const userId = parseInt(req.query.userId, 10);
  if (req.user.isAdmin !== 1 && req.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden: Access denied" });
  }
  return next();
};

const authorizeSelfOrAdminWithIdInBody = (req, res, next) => {
  const userId = parseInt(req.body.userId, 10);
  if (req.user.isAdmin !== 1 && req.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden: Access denied" });
  }
  return next();
};

const authorizeVehicleDelete = async (req, res, next) => {
  try {
    const vehicleId = parseInt(req.params.id, 10);
    const currentUserId = req.user.id;
    const isAdmin = req.user.isAdmin === 1;

    const vehicle = await tables.vehicle.read(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    if (!isAdmin && vehicle.user_id !== currentUserId) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  return null;
};

const authorizeReservationDelete = async (req, res, next) => {
  try {
    const reservationId = parseInt(req.params.id, 10);
    const currentUserId = req.user.id;
    const isAdmin = req.user.isAdmin === 1;

    const reservation = await tables.reservation.read(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "reservation not found" });
    }

    if (!isAdmin && reservation.user_id !== currentUserId) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }

    next();
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  authorizeAdmin,
  authorizeSelfOrAdmin,
  authorizeSelfOrAdminWithQueryParams,
  authorizeSelfOrAdminWithIdInBody,
  authorizeVehicleDelete,
  authorizeReservationDelete,
};
