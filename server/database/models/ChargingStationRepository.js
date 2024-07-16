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

  async readAllByFilter(filterRequest) {
    const query = filterRequest ? `where ${filterRequest.filterBy} = 1` : "";
    const [rows] = await this.database.query(
      `select ${this.table}.id, ${this.table}.consolidated_longitude, ${this.table}.consolidated_latitude
          from ${this.table} join plug_type on ${this.table}.id = plug_type.id ${query}
     `,
    );
    return rows;
  }
}

module.exports = ChargingStationRepository;
