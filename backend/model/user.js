const mongoose = require("mongoose");
const { Schema } = mongoose;

const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userschema = new Schema({
  photoURL: { type: String },
  accountId: { type: String },
  provider: { type: String },
  // username: { type: String, required: [false, "Username name required"] },
  phoneNo: { type: Number },
  name: { type: String, required: [true, "Name required"] },
  lastname: { type: String },
  email: {
    type: String,
    required: [true, "Email required"],
    validate: [validateEmail, "Please enter a valid email"],
    unique: [true, "Email already exists"],
  },
  password: { type: String },
});

const User = mongoose.model("User", userschema);
// -------------------------------------------------------------------------

module.exports = { User };
