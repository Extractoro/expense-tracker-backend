const mongoose = require("mongoose");

const userCreationSchema = new mongoose.Schema({
  cards: {
    type: Array,
  },
  incomes: {
    type: Array,
  },
  expenses: {
    type: Array,
  },
});

module.exports = mongoose.model("UserCreation", userCreationSchema);
