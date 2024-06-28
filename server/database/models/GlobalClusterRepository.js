const AbstractRepository = require("./AbstractRepository");

class GlobalClusterRepository extends AbstractRepository {
  constructor() {
    super({ table: "charging_station" });
  }
  async readGlobal() {
    const [rows] = await this.database.query(
      `SELECT COUNT(id) FROM charging_station WHERE consolidated_latitude BETWEEN 42.43996395481483 AND 46.070791881897776 AND consolidated_longitude BETWEEN -1.513817443517155 AND 3.2772004183927663;`,
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }
}

module.exports = GlobalClusterRepository;
