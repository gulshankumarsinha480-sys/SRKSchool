// models/Enquiry.model.js
// All direct MS SQL queries for the Enquiries table

const { getPool, sql } = require("../config/db");

// ── Create ──────────────────────────────────────────────────
async function createEnquiry({ name, phone, grade, message }) {
  const db = await getPool();
  const result = await db.request()
    .input("Name",    sql.NVarChar(150),  name)
    .input("Phone",   sql.NVarChar(20),   phone)
    .input("Grade",   sql.NVarChar(30),   grade)
    .input("Message", sql.NVarChar(1000), message || null)
    .query(`
      INSERT INTO Enquiries (Name, Phone, Grade, Message)
      OUTPUT INSERTED.*
      VALUES (@Name, @Phone, @Grade, @Message)
    `);
  return result.recordset[0];
}

// ── Find all (with optional filters + pagination) ───────────
async function findAll({ status, search, limit, offset }) {
  const db      = await getPool();
  const request = db.request()
    .input("Limit",  sql.Int, limit)
    .input("Offset", sql.Int, offset);

  let where = "WHERE 1=1";

  if (status) {
    where += " AND Status = @Status";
    request.input("Status", sql.NVarChar(20), status);
  }

  if (search) {
    where += ` AND (
      Name  LIKE '%' + @Search + '%' OR
      Phone LIKE '%' + @Search + '%' OR
      Grade LIKE '%' + @Search + '%'
    )`;
    request.input("Search", sql.NVarChar(100), search);
  }

  const countResult = await request.query(
    `SELECT COUNT(*) AS Total FROM Enquiries ${where}`
  );

  const dataResult = await request.query(`
    SELECT *
    FROM   Enquiries
    ${where}
    ORDER  BY SubmittedAt DESC
    OFFSET @Offset ROWS
    FETCH  NEXT @Limit ROWS ONLY
  `);

  return {
    total: countResult.recordset[0].Total,
    rows:  dataResult.recordset,
  };
}

// ── Find one by ID ───────────────────────────────────────────
async function findById(id) {
  const db     = await getPool();
  const result = await db.request()
    .input("Id", sql.BigInt, id)
    .query("SELECT * FROM Enquiries WHERE Id = @Id");
  return result.recordset[0] || null;
}

// ── Update status ────────────────────────────────────────────
async function updateStatus(id, status) {
  const db     = await getPool();
  const result = await db.request()
    .input("Id",     sql.BigInt,     id)
    .input("Status", sql.NVarChar(20), status)
    .query(`
      UPDATE Enquiries
      SET    Status = @Status
      OUTPUT INSERTED.*
      WHERE  Id = @Id
    `);
  return result.recordset[0] || null;
}

// ── Delete ───────────────────────────────────────────────────
async function deleteById(id) {
  const db     = await getPool();
  const result = await db.request()
    .input("Id", sql.BigInt, id)
    .query("DELETE FROM Enquiries OUTPUT DELETED.Id WHERE Id = @Id");
  return result.recordset[0] || null;
}

// ── Summary stats ────────────────────────────────────────────
async function getSummaryStats() {
  const db     = await getPool();
  const result = await db.request().query(`
    SELECT
      COUNT(*)                                                         AS Total,
      SUM(CASE WHEN Status = 'new'       THEN 1 ELSE 0 END)           AS New,
      SUM(CASE WHEN Status = 'contacted' THEN 1 ELSE 0 END)           AS Contacted,
      SUM(CASE WHEN Status = 'closed'    THEN 1 ELSE 0 END)           AS Closed,
      SUM(CASE WHEN CAST(SubmittedAt AS DATE) = CAST(SYSUTCDATETIME() AS DATE)
               THEN 1 ELSE 0 END)                                     AS TodayCount
    FROM Enquiries
  `);
  return result.recordset[0];
}

module.exports = {
  createEnquiry,
  findAll,
  findById,
  updateStatus,
  deleteById,
  getSummaryStats,
};