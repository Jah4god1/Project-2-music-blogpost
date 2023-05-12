const mysql = require('mysql');
const { dbConfig } = require('../config');

const pool = mysql.createPool(dbConfig);

exports.getConnection = (callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return callback(err);
    }
    callback(null, connection);
  });
};
