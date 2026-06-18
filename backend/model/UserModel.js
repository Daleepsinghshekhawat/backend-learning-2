const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    phone: {
      type: String,
    },
    city: String,
    country: String,
    gender: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    course: String,
    address: String,
    pincode: {
      type: Number,
      min: 100000,
      max: 999999,
    },
    company: String,
    salary: {
      type: Number,
      min: 0,
    },
    skill: String,
    experience: String,

    password: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
    },

    role: String,

    status: {
      type: String,
      default: "active",
    },
    department: {
      type: String,
    },

    joiningdate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);



module.exports = mongoose.model("user", userSchema);
