const pg = require('pg');

config = {
  user: 'tester', 
  database: 'tokenauth', 
  password: 'dbpass', 
  host: 'localhost', 
  port: 5432, 
  max: 10,
  idleTimeoutMillis: 30000, 
};

const pool = new pg.Pool(config);

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};