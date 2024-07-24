const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (lastname, firstname, email, hashed_password, creation_date) values (?, ?, ?, ?, NOW())`,
      [user.lastname, user.firstname, user.email, user.hashedPassword],
    );
    return result.insertId;
  }

  async findByEmail(email) {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
    return rows[0];
  }

  async read(id) {
    const [rows] = await this.database.query(`select * from ${this.table} where id = ?`, [id]);

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async update(id, user) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET 
      lastname = ? ,
      firstname = ? , 
      hashed_password = ?
      WHERE id = ?`,
      [user.lastname, user.firstname, user.hashedPassword, id],
    );
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = UserRepository;
