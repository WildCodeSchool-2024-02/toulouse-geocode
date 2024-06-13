const path = require("path");
const fs = require("fs");
const AbstractSeeder = require("./AbstractSeeder");

class PaymentSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "payment_type", truncate: true });
    const src = path.join(__dirname, "..", "sources", "payment_type.csv");
    this.content = fs.readFileSync(src, "utf8");
  }

  run() {
    const rows = this.content.split("\n");
    rows.forEach((row) => {
      const cols = row.split(";");
      const [prepaidPayment, cCardPayment, cashPayment] = cols;
      const obj = {
        prepaid_payment: prepaidPayment,
        c_card_payment: cCardPayment,
        cash_payment: cashPayment,
      };
      this.insert(obj);
    });
  }
}

module.exports = PaymentSeeder;
