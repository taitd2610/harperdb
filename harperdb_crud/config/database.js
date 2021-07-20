const harperive = require("harperive");
const { DB_URL, USER, PASSWORD } = process.env;

const DB_CONFIG = {
  harperHost: DB_URL,
  username: USER,
  password: PASSWORD,
};

const client = harperive.Client;
const db = new client(DB_CONFIG);

module.exports = db;
