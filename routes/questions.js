//Questions routes module
const express = require("express");
const router = express.Router();

router.get("/question1", (req, res) => {
  res.render("pages/question.ejs");
});

router.get("/question2", (req, res) => {
  res.render("pages/question.ejs");
});

router.get("/question3", (req, res) => {
  res.render("pages/question.ejs");
});

router.get("/question4", (req, res) => {
  res.render("pages/question.ejs");
});

router.get("/question5", (req, res) => {
  res.render("pages/question.ejs");
});

router.get("/question6", (req, res) => {
  res.render("pages/question.ejs");
});

module.exports = router;
