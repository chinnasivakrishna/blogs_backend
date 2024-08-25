// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('./db');
const app = express();

const crypto = require('crypto');

const key = crypto.randomBytes(64).toString('hex'); // Generate a 64-byte (512-bit) key
console.log('Generated JWT Secret Key:', key);


const blogRoutes = require('./routes/blogRoutes');
const user = require("./Routes/UserRoutes");
const cors = require('cors')

app.use(cors())

app.use(express.json());



app.use('/api/blogs', blogRoutes);
app.use("/api", user);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
