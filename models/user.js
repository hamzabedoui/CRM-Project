const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is invalid",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, // Hide password by default
  },
  role: {
    type: String,
    enum: ["responsable", "client"],
    default: "client",
  },
  workingAddress: {
    type: String,
    required: function () {
      return this.role === "client";
    },
  },
  phoneNumber: {
    type: String,
    required: function () {
      return this.role === "client";
    },
  },
  avatar: {
    type: String,
    default: null,
  },
});

// Middleware to hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate JWT token
UserSchema.methods.generateToken = function () {
  const payload = {
    user: {
      id: this.id,
      role: this.role,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); // Example: Expires in 1 hour
};

module.exports = mongoose.model("User", UserSchema);
