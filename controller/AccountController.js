const db = require("../config/db");
require("../config/global");

async function login(data) {
  try {
    data.pin = crypto.createHmac("sha256", salt).update(data.pin).digest("hex");
    let results = await db.login(data);
    if (results.length == 0) {
      return {
        status: "Incorrect username or password. Please Retry.",
        status_code: 401,
      };
    }
    return {
      status: "Success",
      status_code: 200,
      username: data.username,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getBalance(account_number) {
  try {
    let results = await db.getBalance(account_number);
    if (results.length == 0) {
      return {
        status: "Failed to fetch balance.",
        status_code: 400,
      };
    }
    return {
      status: "Success",
      status_code: 200,
      data: results[0],
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = { login, getBalance };
