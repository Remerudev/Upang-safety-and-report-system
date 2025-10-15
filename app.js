const express = require("express");
const connectDB = require("./config/DataConnection");
const app = express();

app.use(express.json());  

connectDB();

app.use("/admin", require("./routes/adminroute"));
app.use("/user", require("./routes/Userroute"));
module.exports = app;