const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    required :false,
    default:'user'
  },
});

module.exports = mongoose.model("signup", signupSchema);
