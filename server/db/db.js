const { Pool } = require('pg');
const Promise = require('bluebird');
require('dotenv').config();

const db = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

module.exports = db;
