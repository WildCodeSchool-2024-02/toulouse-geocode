const AbstractRepository = require("./AbstractRepository");

class ClusterRepository extends AbstractRepository {
  constructor() {
    super({ table: "charging_station" });
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT station_name, station_adress, consolidated_latitude, consolidated_longitude, SUM (nbr_poc) AS total_points_of_charge FROM ${this.table} GROUP BY station_name, station_adress, consolidated_latitude, consolidated_longitude;`
    );
    return rows;
  }
}

module.exports = ClusterRepository;
