const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 100,
    },
    userEmail: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 100,
    },
    cards: {
      type: Array,
      default: [],
    },
    incomes: {
      type: Array,
      default: [],
    },
    expenses: {
      type: Array,
      default: [],
    },
  },
  { collection: "data" }
);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(100).required(),
  });
  return schema.validate(user);
}

function validateLoginUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(100).required(),
  });
  return schema.validate(user);
}

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {
  validateUser,
  validateLoginUser,
  User,
};
