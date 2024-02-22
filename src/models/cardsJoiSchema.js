const Joi = require("joi");

const cardsSchema = Joi.object({
  id: Joi.any().required(),
  name: Joi.string().required(),
  balance: Joi.number().required(),
  cardNumber: Joi.number().min(16).max(16).required(),
  cvc: Joi.number().min(3).max(3).required(),
  expirationMM: Joi.number().min(2).max(2).required(),
  expirationYY: Joi.number().min(2).max(2).required(),
});

module.exports = cardsSchema;
