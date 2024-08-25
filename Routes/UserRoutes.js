const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const {User} = require("../Model/User")
const app = express();
app.use(bodyParser.json())
const user = express.Router();

const jwt = require("jsonwebtoken");

// Your secret key for signing JWT tokens
const JWT_SECRET = "12345";

user.route("/add").post(async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save();
    res.json("Success")
    
  } catch (error) {
    res.json({ message: error })
  }
});
// Routes/UserRoutes.js
 // Replace with your actual secret key

user.route("/login").post(async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Fetch user from the database
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    // Validate password (assuming plain text for simplicity, use hashed passwords in production)
    if (user.Password !== Password) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ email: user.Email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { email: user.Email, id: user._id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = user;
