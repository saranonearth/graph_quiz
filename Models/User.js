const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    answers: [{ type: Number }],
  },
  { id: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
