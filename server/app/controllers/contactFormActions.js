const tables = require("../../database/tables");

const add = async (req, res, next) => {
  const contactMessage = req.body;

  try {
    const insertId = await tables.contact_message.create(contactMessage);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = { add };
