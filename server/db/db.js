const { Pool } = require('pg');
const Promise = require('bluebird');

// Configure process.env variables in ../.env
const connection = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.PORT,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to PostgreSQL as id: ${db.threadId}`))
  .then(() => db.queryAsync(
    'CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY)',
  ))
  .catch((err) => console.log(err));

module.exports = db;
