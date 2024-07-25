const AbstractRepository = require("./AbstractRepository");

class VehicleRepository extends AbstractRepository {
  constructor() {
    super({ table: "vehicle" });
  }

  async create(vehicle) {
    const [result] = await this.database.query(
      `insert into ${this.table} (user_id, brand, model, year, power_voltage, plug_type) values ( ? , ? , ? , ? , ? , ? ) `,
      [
        vehicle.user_id,
        vehicle.brand,
        vehicle.model,
        vehicle.year,
        vehicle.powerVoltage,
        vehicle.plugType,
      ],
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(`select * from ${this.table} where id = ?`, [id]);

    return rows[0];
  }

  async readAll(userId) {
    const query = userId ? `where user_id = ?` : "";
    const [rows] = await this.database.query(`select * from ${this.table} ${query}`, [userId]);
    return rows;
  }

  async delete(id) {
    const [result] = await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = VehicleRepository;
