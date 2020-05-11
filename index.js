const express = require("express");
const db = require("./db");
const ejs = require("ejs");

const { addUser } = require("./Controllers/User");

db.connect();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));
app.use(express.json({ extended: false }));
app.set("view engine", ejs);

let ans = [];

let correctAns = [150, 100];

app.get("/", (req, res) => {
  res.render("pages/homepage.ejs");
});

app.route("/question1").get((req, res) => {
  res.render("pages/question1.ejs");
  ans = [];
});

app.get("/check", (req, res) => {
  const { level, value } = req.query;
  ans.push(value);
  const key = correctAns[level - 1];
  if (value >= key - 5 && value <= key + 5) {
    res.json({
      okay: true,
      message: "Correct Answer",
    });
  } else {
    res.json({
      okay: false,
      message: "Too bad! Your answer is incorrect",
      correct: key,
    });
  }
});

app.get("/question2", (req, res) => {
  res.render("pages/question2.ejs");
});

app.post("/submit", (req, res) => {
  addUser(ans);
  res.send("working");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
