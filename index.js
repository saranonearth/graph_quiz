const express = require("express");
const db = require("./db");
const ejs = require("ejs");

const { addUser } = require("./controllers/User");
const questionsRouter = require("./routes/questions");

db.connect();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));
app.use(express.json({ extended: false }));
app.set("view engine", ejs);
app.use("/", questionsRouter);

let ans = [];

let correctAns = [295, 29.8, 172, 11339, 3986, 7271];

//Response array
let messages = [
  "Only 295 lakh cases were sold in Andhra Pradesh during 2019-2020",
  "The YSRCP Government spent Rs. 29,773 Crore on Education this year",
  "In the year 2019-20, Andhra Pradesh produced a record high of 172 Lakh Tonnes of food grains",
  "In order to make provide affordable health care to every citizen, the YSRCP Government spent Rs. 11,399 Crore on Health Care this year",
  "In order to convert Andhra Pradesh into an Industrial Hub, the Government has spent Rs. 3,986 Crore this year",
  "In order to transform Backward Classes into Backbone Classes, the YSRCP Government has spent Rs. 7,271 Crore this year",
];

app.get("/check", (req, res) => {
  const { level, value } = req.query;
  let okay;
  console.log(level);
  ans.push(value);
  const key = correctAns[level - 1];
  console.log(ans);
  if (value == key) {
    okay = true;
  } else {
    okay = false;
  }
  res.json({
    okay,
    message: messages[level - 1],
    correct: key,
  });
});

app.get("/end", (req, res) => {
  res.render("pages/ending.ejs");
});

app.post("/submit", (req, res) => {
  //To ensure no extra values are added.
  while (ans.length != correctAns.length) {
    ans.shift();
  }
  addUser(ans);
  res.send("working");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
