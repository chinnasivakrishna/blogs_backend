// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('./db');
const app = express();


app.get('/', (req, res) => {
    res.json({
        message: 'The API is working!'
    });
});
const blogRoutes = require('./Routes/blogRoutes');
const user = require("./Routes/UserRoutes");
const cors = require('cors')

app.use(cors({
  origin: ["https://blogs-three-rho.vercel.app"],
  methods: ["GET", "POST","PUT", "DELETE"],
  credentials:true
}));
app.use(bodyParser.json());


app.use(express.json());



app.use('/api/blogs', blogRoutes);
app.use("/api", user);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
