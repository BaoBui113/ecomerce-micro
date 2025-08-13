const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

require("dotenv").config();

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (userExists.rows.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    const user = result.rows[0];
    const token = generateToken({ id: user.id, email: user.email });

    return res
      .status(201)
      .json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (user.rows.length === 0) {
    return res.status(400).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    id: user.rows[0].id,
    email: user.rows[0].email,
  });

  return res
    .status(200)
    .json({ user: { id: user.rows[0].id, email: user.rows[0].email }, token });
});

router.get("/validate", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const tokenData = token.split(" ")[1];
    const user = jwt.verify(tokenData, process.env.JWT_SECRET);
    return res.status(200).json({ ...user });
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

module.exports = router;
