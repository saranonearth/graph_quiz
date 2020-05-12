//Questions routes module
const express = require("express");
const router = express.Router();

router.get("/question1", (req, res) => {
  res.render("pages/question.ejs");
});

router.get("/question2", (req, res) => {
  res.render("pages/question.ejs");
});

module.exports = router;
