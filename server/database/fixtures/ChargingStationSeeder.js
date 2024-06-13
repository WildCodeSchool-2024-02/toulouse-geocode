const path = require("path");
const fs = require("fs");
const AbstractSeeder = require("./AbstractSeeder");

class ChargingStationSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "charging_station", truncate: true });
    const src = path.join(__dirname, "..", "sources", "charging_station.csv");
    this.content = fs.readFileSync(src, "utf8");
  }

  run() {
    const rows = this.content.split("\n");
    rows.forEach((row) => {
      const cols = row.split(";");

      const [
        idStationItinerance,
        stationName,
        stationImplantation,
        stationAdress,
        consolidatedLongitude,
        consolidatedLatitude,
        geojsonCoordinates,
        nbrPoc,
        powerVoltage,
        free,
        accessCondition,
        isBooked,
        hourlyAccess,
        accessPrm,
        motorCycleStation,
        launchingDate,
        updateDate,
        datagouvOrganizationOrOwner,
      ] = cols;

      const obj = {
        id_station_itinerance: idStationItinerance,
        station_name: stationName,
        station_implantation: stationImplantation,
        station_adress: stationAdress,
        consolidated_longitude: consolidatedLongitude,
        consolidated_latitude: consolidatedLatitude,
        geojson_coordinates: geojsonCoordinates,
        nbr_poc: nbrPoc,
        power_voltage: powerVoltage,
        free,
        access_condition: accessCondition,
        is_booked: isBooked,
        hourly_access: hourlyAccess,
        access_prm: accessPrm,
        motor_cycle_station: motorCycleStation,
        launching_date: launchingDate,
        update_date: updateDate,
        datagouv_organization_or_owner: datagouvOrganizationOrOwner,
      };
      this.insert(obj);
    });
  }
}

module.exports = ChargingStationSeeder;
