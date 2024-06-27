const path = require("path");
const fs = require("fs");
const AbstractSeeder = require("./AbstractSeeder");

class PlugTypeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "plug_type", truncate: true });
    const src = path.join(__dirname, "..", "sources", "plug_type.csv");
    this.content = fs.readFileSync(src, "utf8");
  }

  run() {
    const rows = this.content.split("\n");
    rows.forEach((row) => {
      const cols = row.split(";");
      const [
        plugTypeEf,
        plugType2,
        plugTypeComboCcs,
        plugTypeChademo,
        plugTypeAutre,
      ] = cols;
      const obj = {
        plug_type_ef: plugTypeEf,
        plug_type_2: plugType2,
        plug_type_combo_ccs: plugTypeComboCcs,
        plug_type_chademo: plugTypeChademo,
        plug_type_autre: plugTypeAutre,
      };
      this.insert(obj);
    });
  }
}

module.exports = PlugTypeSeeder;
