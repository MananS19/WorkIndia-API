const db = require("../config/db");
require("../config/global");

async function transfer(data) {
  try {
    let sendMoneyData = data;
    sendMoneyData["transaction_type"] = "debit";
    sendMoneyData["transaction_timestamp"] = new Date(moment());
    let sendMoney = await db.sendMoney(sendMoneyData);
    let transaction1 = await db.saveTransaction(sendMoneyData);
    let receiveMoneyData = data;
    receiveMoneyData["transaction_type"] = "credit";
    receiveMoneyData["transaction_timestamp"] = new Date(moment());
    let receiveMoney = await db.receiveMoney(receiveMoneyData);
    let transaction2 = await db.saveTransaction(receiveMoneyData);
    return {
      status: "Transaction happened successfully",
      status_code: 200,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function add(account_number, data) {
  try {
    data["transaction_type"] = "credit";
    data["transaction_timestamp"] = new Date(moment());
    let addMoney = await db.add(account_number, data.amount);
    let transaction = await db.saveTransaction();
    return {
      status: "Transaction happened successfully",
      status_code: 200,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
module.exports = { transfer, add };
