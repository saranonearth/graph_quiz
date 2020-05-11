//User controllers here
const mongoose = require("mongoose");
const User = require("../Models/User");

const addUser = async (ans) => {
  const answers = [...ans];
  const newUser = new User({ answers });
  const saved = await newUser.save();
  console.log(saved);
};

module.exports = { addUser };
