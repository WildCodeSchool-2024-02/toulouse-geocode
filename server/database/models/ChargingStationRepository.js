const AbstractRepository = require("./AbstractRepository");

class ChargingStationRepository extends AbstractRepository {
  constructor() {
    super({ table: "charging_station" });
  }

  async read(id) {
    const [rows] = await this.database.query(`select * from ${this.table} where id = ?`, [id]);
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select id, consolidated_longitude, consolidated_latitude from ${this.table}`,
    );
    return rows;
  }
}

module.exports = ChargingStationRepository;
