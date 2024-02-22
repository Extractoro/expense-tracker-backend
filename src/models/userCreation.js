const mongoose = require("mongoose");

const userCreationSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    cards: {
      type: Array,
      required: true,
    },
    incomes: {
      type: Array,
      required: true,
    },
    expenses: {
      type: Array,
      required: true,
    },
  },
  { collection: "data" }
);

module.exports = mongoose.model("user", userCreationSchema);
