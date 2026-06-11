require("dotenv").config();
const express        = require("express");
const cors           = require("cors");
const enquiryRoutes  = require("./routes/enquiry.routes");
const authRoutes     = require("./routes/auth.routes");
const { getPool }    = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",      authRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.get("/", (_req, res) => res.json({ status: "SRK API running" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`SRK API running on http://localhost:${PORT}`);
  try {
    await getPool();
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
});
