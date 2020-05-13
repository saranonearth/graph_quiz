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

let correctAns = [150, 80];

app.get("/check", (req, res) => {
  const { level, value } = req.query;
  console.log(level);
  ans.push(value);
  const key = correctAns[level - 1];
  console.log(ans);
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
