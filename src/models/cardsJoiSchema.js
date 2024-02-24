const Joi = require("joi");

const cardsSchema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().required(),
  cardNumber: Joi.string().min(16).max(16).required(),
  cvc: Joi.string().min(3).max(3).required(),
  expirationMM: Joi.string().min(2).max(2).required(),
  expirationYY: Joi.string().min(2).max(2).required(),
});

module.exports = cardsSchema;

// {
//     "name": "sfDad",
//     "balance": 121334,
//     "cardNumber": "5167985520240000",
//     "cvc": "153",
//     "expirationMM": "10",
//     "expirationYY": "12"
// }
