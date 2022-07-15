const db = require("../config/db");

async function getAllTransaction(start, end, sort) {
  try {
    let result = await db.getAllTransaction(start, end, sort);
    return {
      status_code: 200,
      data: result,
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getAllTransaction };
