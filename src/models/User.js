const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  emailId: String,
  hashPassword: String,
  age: Number,
  gender: String,
});

// this will written an object

module.exports = mongoose.model("User", userSchema);
