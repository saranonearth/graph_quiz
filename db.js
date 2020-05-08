const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/users";

const connect = () => {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
  mongoose.connection.on("error", (err) => {
    console.log(`Connection Error: ${err}`);
  });
};

module.exports = { connect };
