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

app.get("/", (req, res) => {
  res.render("pages/homepage.ejs");
});

app.route("/question1").get((req, res) => {
  res.render("pages/question1.ejs");
  ans = [];
});

app.get("/question2", (req, res) => {
  ans.push(req.query.val);
  console.log(ans);
  res.render("pages/question2.ejs");
});

app.post("/submit", (req, res) => {
  ans.push(req.body.val);
  addUser(req, res, ans);
  return res.send("Done");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
