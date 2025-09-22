const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register (optional)
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Optionally, store token in a cookie
    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // HTTPS me true
  sameSite: "None", // cross-site requests ke liye
});
res.json({ message: "Login successful", token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
