const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  const validUser = username === process.env.ADMIN_USERNAME;
  const validPass = bcrypt.compareSync(password, bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10));

  if (!validUser || !validPass)
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || "srk_secret_key",
    { expiresIn: "8h" }
  );

  res.json({ success: true, token });
};
