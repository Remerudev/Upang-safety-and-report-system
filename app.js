const express = require("express");
const connectDB = require("./config/DataConnection");
const app = express();

app.use(express.json());  

connectDB();

app.use("/admin", require("./routes/adminroute"));
app.use("/user", require("./routes/Userroute"));
app.use("/incident", require("./routes/Incidentroute"));
app.use("/professor", require("./routes/Profroute"));

module.exports = app;