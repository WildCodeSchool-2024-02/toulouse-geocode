const AbstractRepository = require("./AbstractRepository");

class ClusterRepository extends AbstractRepository {
  constructor() {
    super({ table: "charging_station" });
  }

  async readBycoord(lt1, lt2, lo1, lo2) {
    const [rows] = await this.database.query(
      `SELECT station_name, station_adress, consolidated_latitude, consolidated_longitude FROM ${this.table} WHERE consolidated_latitude BETWEEN lt1 = ? AND lt2 = ? AND consolidated_longitude BETWEEN lo1 = ? AND lo2 = ?;`[
        (lt1.latitude, lt2.latitude, lo1.longitude, lo2.longitude)
      ]
    );
    return rows[0];
  }

  async readAllGrouped() {
    const [rows] = await this.database.query(
      `SELECT station_name, station_adress, consolidated_latitude, consolidated_longitude, SUM (nbr_poc) AS total_points_of_charge FROM ${this.table} GROUP BY station_name, station_adress, consolidated_latitude, consolidated_longitude;`
    );
    return rows;
  }
}
module.exports = ClusterRepository;
