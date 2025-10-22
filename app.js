const express = require("express");
const connectDB = require("./config/DataConnection");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/admin", require("./routes/adminroute"));
app.use("/user", require("./routes/Userroute"));
app.use("/incident", require("./routes/Incidentroute"));
app.use("/professor", require("./routes/Profroute"));

//this line for forgot/reset password routes
app.use("/api/auth", require("./routes/auth"));

module.exports = app;
