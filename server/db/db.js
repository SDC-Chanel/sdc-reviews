const { Pool } = require('pg');
const Promise = require('bluebird');
require('dotenv').config();

// Configure process.env variables in ../.env
const db = new Pool({
  host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

// const db = Promise.promisifyAll(connection, { multiArgs: true });

// db.connectAsync()
//   .then(() => console.log(`Connected to PostgreSQL as id: ${db.threadId}`))
//   // .then(() => db.queryAsync(
//   //   'CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY)',
//   // )
//   .catch((err) => console.log(`ERR in PostgreSQL connection: ${err}`));

module.exports = db;


// why am I so bad at this LOL
