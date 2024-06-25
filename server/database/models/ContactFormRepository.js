const AbstractRepository = require("./AbstractRepository");

class ContactFormRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "Contact" as configuration
    super({ table: "contact_message" });
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(contactMessage) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, email, message) values (?, ?, ?)`,
      [contactMessage.name, contactMessage.email, contactMessage.message]
    );

    return result.insertId;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = ContactFormRepository;
