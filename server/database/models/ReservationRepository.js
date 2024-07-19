const AbstractRepository = require("./AbstractRepository");

class ReservationRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "reservation" as configuration
    super({ table: "reservation" });
  }

  // The C of CRUD - Create operation

  async create(reservation) {
    // Execute the SQL INSERT query to add a new reservation to the "reservation" table
    const [result] = await this.database.query(
      `insert into ${this.table} (duration, starting_time, ending_time, price, user_id, charging_station_id) values (?, ?, ?, ?, ?, ?)`,
      [
        reservation.duration,
        reservation.startingTime,
        reservation.endingTime,
        reservation.price,
        reservation.userId,
        reservation.chargingStationId,
      ]
    );

    // Return the ID of the newly inserted reservation
    return result.insertId;
  }

  async findOverlappingReservations(startingTime, endingTime) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} 
             WHERE (starting_time < ? AND ending_time > ?) 
             OR (starting_time >= ? AND starting_time < ?)`,
      [endingTime, startingTime, startingTime, endingTime]
    );
    return rows;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT reservation.*, user.firstname, user.lastname, user.email, charging_station.station_name, charging_station.station_adress
             FROM ${this.table} reservation
             JOIN user ON reservation.user_id = user.id
             JOIN charging_station ON reservation.charging_station_id = charging_station.id
             WHERE reservation.id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT r.*, u.firstname, u.lastname, u.email, cs.station_name, cs.station_adress
             FROM ${this.table} r
             JOIN user u ON r.user_id = u.id
             JOIN charging_station cs ON r.charging_station_id = cs.id`
    );
    return rows;
  }

  // The U of CRUD - Update operation
  async update(reservation) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET 
      duration = ?, 
      starting_time = ?, 
      ending_time = ?, 
      price = ?, 
      WHERE id = ?`,
      [
        reservation.duration,
        reservation.starting_time,
        reservation.ending_time,
        reservation.price,
        reservation.id,
      ]
    );
    return result.affectedRows > 0;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = ReservationRepository;
