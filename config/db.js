const con = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: "3306",
  user: "root",
  database: "workindia",
  password: process.env.SQLPassword,
});

let workindia = {};

workindia.all = () => {
  return new Promise((resolve, reject) => {
    con.query("select * from users", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

workindia.saveUser = (data) => {
  return new Promise((resolve, reject) => {
    con.query(
      "insert into users (email_id, name, dob, aadhar_number, pancard_number, address, pin, account_number, last_transaction_timestamp) values (?,?,?,?,?,?,?,?,?)",
      [
        data.email_id,
        data.name,
        data.dob,
        data.aadhar_number,
        data.pancard_number,
        data.address,
        data.pin,
        data.account_number,
        data.last_transaction_timestamp,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

workindia.login = (data) => {
  return new Promise((resolve, reject) => {
    con.query(
      "select * from users where email_id=? and pin=?",
      [data.username, data.pin],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

workindia.getBalance = (data) => {
  return new Promise((resolve, reject) => {
    con.query(
      "select account_number, balance, account_state, last_transaction_timestamp from users where account_number=?",
      data,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

workindia.sendMoney = (data) => {
  return new Promise((resolve, reject) => {
    con.query(
      "update users set balance = balance - ? where name = ?",
      [data.amount, data.sender_name],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

workindia.receiveMoney = (data) => {
  return new Promise((resolve, reject) => {
    con.query(
      "update users set balance = balance + ? where name = ?",
      [data.amount, data.beneficiary_name],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

workindia.saveTransaction = (data) => {
  return new Promise((resolve, reject) => {
    con.query(
      "insert into transaction values (?,?,?,?,?,?,?)",
      [
        data.transaction_type,
        data.transaction_timestamp,
        data.beneficiary_name,
        data.sender_name,
        data.amount,
        data.transaction_name,
        data.transaction_mode,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

workindia.add = (account_number, amount) => {
  return new Promise((resolve, reject) => {
    con.query(
      "update users set balance = balance + ? where account_number = ?",
      [amount, account_number],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

workindia.getAllTransaction = (start, end, sort) => {
  return new Promise(
    "select * from transaction where transaction_timestamp > ? and transaction_timestamp < ? order_by transaction_timestamp ?",
    [start, end, sort],
    (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }
  );
};

module.exports = workindia;
