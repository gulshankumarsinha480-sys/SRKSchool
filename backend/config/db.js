// config/db.js
require("dotenv").config();
const sql = require("mssql");

const dbConfig = {
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server:   process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port:     parseInt(process.env.DB_PORT || "1433"),
  options: {
    encrypt:                false,
    trustServerCertificate: true,
    enableArithAbort:       true,
  },
  pool: {
    max:              10,
    min:              0,
    idleTimeoutMillis: 30000,
  },
};

let pool = null;

async function getPool() {
  if (!pool) {
    pool = await sql.connect(dbConfig);
    console.log("✅  Connected to MS SQL Server");
  }
  return pool;
}

exports.getPool = getPool;
exports.sql = sql;