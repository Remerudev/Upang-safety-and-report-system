const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/IncidentReporting_db");
    console.log("Connection started");
  } catch (err) {
    console.error("Connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;