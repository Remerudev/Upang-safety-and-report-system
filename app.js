const express = require("express");
const connectDB = require("./config/DataConnection");
const app = express();

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
connectDB();

app.use("/admin", require("./routes/adminroute"));
app.use("/user", require("./routes/Userroute"));
app.use("/incidents", require("./routes/Incidentroute.js"));

module.exports = app;