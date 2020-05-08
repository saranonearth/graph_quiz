const express = require("express");
const db = require("./db");
const ejs = require("ejs");

db.connect();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));
app.set("view engine", ejs);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
