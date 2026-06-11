const { getPool, sql } = require("../config/db");

exports.create = async (req, res) => {
  try {
    const { name, phone, grade, message } = req.body;
    const pool = await getPool();
    await pool.request()
      .input("name",    sql.NVarChar(100), name)
      .input("phone",   sql.NVarChar(20),  phone)
      .input("grade",   sql.NVarChar(50),  grade)
      .input("message", sql.NVarChar(500), message || null)
      .query("INSERT INTO Enquiries (Name, Phone, Grade, Message) VALUES (@name, @phone, @grade, @message)");
    res.status(201).json({ success: true, message: "Enquiry submitted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .query("SELECT * FROM Enquiries ORDER BY SubmittedAt DESC");
    res.json({ success: true, data: result.recordset });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.NVarChar(50), req.params.id)
      .query("SELECT * FROM Enquiries WHERE Id = @id");
    if (!result.recordset.length)
      return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, data: result.recordset[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const pool = await getPool();
    await pool.request()
      .input("id",     sql.NVarChar(50), req.params.id)
      .input("status", sql.NVarChar(50), status)
      .query("UPDATE Enquiries SET Status = @status WHERE Id = @id");
    res.json({ success: true, message: "Status updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const pool = await getPool();
    await pool.request()
      .input("id", sql.NVarChar(50), req.params.id)
      .query("DELETE FROM Enquiries WHERE Id = @id");
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN Status = 'new'       THEN 1 ELSE 0 END) AS new_count,
        SUM(CASE WHEN Status = 'contacted' THEN 1 ELSE 0 END) AS contacted,
        SUM(CASE WHEN Status = 'closed'    THEN 1 ELSE 0 END) AS closed
      FROM Enquiries
    `);
    res.json({ success: true, data: result.recordset[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
