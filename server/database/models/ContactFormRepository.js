const AbstractRepository = require("./AbstractRepository");

class ContactFormRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "Contact" as configuration
    super({ table: "contact_message" });
  }

  async create(contactMessage) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, email, message) values (?, ?, ?)`,
      [contactMessage.name, contactMessage.email, contactMessage.message]
    );

    return result.insertId;
  }
}

module.exports = ContactFormRepository;
