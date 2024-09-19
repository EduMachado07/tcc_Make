const mysql = require('mysql2');

// Crie uma conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'SGME_HUBFLOW',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify para usar async/await
const promisePool = pool.promise();

module.exports = promisePool;
