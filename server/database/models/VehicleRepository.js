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

  async readAll() {
    // Execute the SQL SELECT query to retrieve all vehicles from the "vehicle" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of vehicles
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing vehicle

  // async update(vehicle) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an vehicle by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = VehicleRepository;
