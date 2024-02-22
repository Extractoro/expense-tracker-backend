const mongoose = require("mongoose");

const cardsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
    cvc: {
      type: Number,
      required: true,
    },
    expirationMM: {
      type: Number,
      required: true,
    },
    expirationYY: {
      type: Number,
      required: true,
    },
  },
  { collection: "cards" }
);

const Card = mongoose.model("card", cardsSchema);
module.exports = { Card };
