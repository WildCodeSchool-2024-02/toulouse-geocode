const AbstractRepository = require("./AbstractRepository");

class VehicleRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "vehicle" as configuration
    super({ table: "vehicle" });
  }

  // The C of CRUD - Create operation

  async create(vehicle) {
    // Execute the SQL INSERT query to add a new vehicle to the "vehicle" table
    const [result] = await this.database.query(
      `insert into ${this.table} (user_id, brand, model, year, power_voltage, plug_type) values (?, ?, ?, ?, ? , ?)`,
      [
        vehicle.userId,
        vehicle.brand,
        vehicle.model,
        vehicle.year,
        vehicle.powerVoltage,
        vehicle.plugType,
      ]
    );

    // Return the ID of the newly inserted vehicle
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific vehicle by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the vehicle
    return rows[0];
  }

  async readAll(userId) {
    const query = userId ? `where user_id = ?` : "";
    const [rows] = await this.database.query(
      `select * from ${this.table} ${query}`,
      [userId]
    );
    return rows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = VehicleRepository;
