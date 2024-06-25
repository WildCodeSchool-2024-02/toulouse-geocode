const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const contactMessage = await tables.contact_message.readAll();

    res.json(contactMessage);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const contactMessage = await tables.contact_message.read(req.params.id);
    if (contactMessage == null) {
      res.sendStatus(404);
    } else {
      res.json(contactMessage);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const contactMessage = req.body;

  try {
    const insertId = await tables.contact_message.create(contactMessage);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    await tables.contact_message.delete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = { add, browse, read, destroy };
