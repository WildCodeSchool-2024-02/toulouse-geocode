const path = require("path");
const fs = require("fs");
const AbstractSeeder = require("./AbstractSeeder");

class ChargingStationSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
    const src = path.join(__dirname, "..", "sources", "charging_station.csv");
    this.content = fs.readFileSync(src, "utf8");
  }

  run() {
    const obj = {
      lastname: "Belson",
      firstname: "Gavin",
      email: "gavin.belson@gmail.com",
      hashed_password: "$argon2id$v=19$m=19,t=2,p=1$bEtTb2ZZY0gwaGthMU9CMQ$5RTKMADQRgwhSg",
      creation_date: "2024-07-19T20:00:00",
      last_connection: "2024-07-19T20:00:00",
      isAdmin: "1",
    };

    this.insert(obj);
  }
}

module.exports = ChargingStationSeeder;
