const db = require("../config/db");
require("../config/global");

async function saveUser(data) {
  try {
    data["account_number"] = accountNumber.toString();
    accountNumber += 1;
    let pin = Math.floor(1000 + Math.random() * 9000);
    data["pin"] = crypto
      .createHmac("sha256", salt)
      .update(pin.toString())
      .digest("hex");
    data["last_transaction_timestamp"] = new Date(moment());
    let results = await db.saveUser(data);
    return {
      status_code: 201,
      status: "Account created successfully",
      json_data: {
        pin: pin,
        account_number: data.account_number,
      },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = { saveUser };
