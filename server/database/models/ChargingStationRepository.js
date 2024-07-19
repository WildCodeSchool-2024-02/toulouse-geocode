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

  // "2024-07-19T20:00:00"
  // "2024-07-19T20:20:00"
  async readAllByFilter(filterRequest) {
    let query = "";
    query += filterRequest.filter ? ` ${filterRequest.filter} = 1 ` : " 1 = 1 ";

    query +=
      filterRequest.startingDate && filterRequest.endingDate
        ? `and  NOT EXISTS (
    SELECT 1 FROM reservation
    WHERE reservation.charging_station_id = ${this.table}.id
    AND reservation.starting_time <= '${filterRequest.startingDate}'
    AND reservation.ending_time >= '${filterRequest.endingDate}'
  )`
        : " and 1=1 ";

    query += filterRequest.limit ? ` limit ${parseInt(filterRequest.limit, 10)} ` : "";

    query += filterRequest.offset ? ` offset ${parseInt(filterRequest.offset, 10)} ` : "";

    const [rows] = await this.database.query(
      `select ${this.table}.id, ${this.table}.consolidated_longitude, ${this.table}.consolidated_latitude
          from ${this.table} join plug_type on ${this.table}.id = plug_type.id where ${query} 
     `,
    );
    return rows;
  }
}

module.exports = ChargingStationRepository;
