require("dotenv").config();
const harperive = require("harperive");

const { HARPERDB_HOST, HARPERDB_USERNAME, HARPERDB_PASSWORD, HARPERDB_SCHEMA } =
  process.env;

// Defining the harperive configuration
const DB_CONFIG = {
  harperHost: HARPERDB_HOST,
  username: HARPERDB_USERNAME,
  password: HARPERDB_PASSWORD,
  schema: HARPERDB_SCHEMA,
};

const Client = harperive.Client;
const db = new Client(DB_CONFIG);

module.exports = db;
