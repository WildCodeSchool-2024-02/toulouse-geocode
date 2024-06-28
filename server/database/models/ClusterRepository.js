const AbstractRepository = require("./AbstractRepository");

class ClusterRepository extends AbstractRepository {
  constructor() {
    super({ table: "charging_station" });
  }

  async readBycoord(lt2, lt1, lg2, lg1) {
    const [rows] = await this.database.query(
      `SELECT station_name, station_adress, consolidated_latitude, consolidated_longitude FROM ${this.table} WHERE consolidated_latitude BETWEEN ? AND ? AND consolidated_longitude BETWEEN ? AND ? ;`,
      [lt2, lt1, lg2, lg1],
    );
    return rows;
  }

  async readAllGrouped() {
    const [rows] = await this.database.query(
      `SELECT station_name, station_adress, consolidated_latitude, consolidated_longitude, SUM (nbr_poc) AS total_points_of_charge FROM ${this.table} GROUP BY station_name, station_adress, consolidated_latitude, consolidated_longitude;`,
    );
    return rows;
  }
}
module.exports = ClusterRepository;
