global.express = require("express");
global.app = express();
global.router = express.Router();
require("dotenv").config();
global.crypto = require("crypto");
global.mysql = require("mysql");
global.moment = require("moment");
global.cors = require("cors");
global._ = require("lodash");

global.accountNumber = 1000000000000000;
global.salt = process.env.SALT;
