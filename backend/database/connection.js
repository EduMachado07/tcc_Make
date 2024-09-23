// src/database/connection.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'SGME_HUBFLOW'
});

module.exports = pool;
