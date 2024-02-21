const Joi = require("joi");

const cardsSchema = Joi.object({
  id: Joi.any().required(),
  name: Joi.string().required(),
  balance: Joi.number().required(),
  cardNumber: Joi.number().length(16).required(),
  cvc: Joi.number().length(3).required(),
  expirationMM: Joi.number().length(2).required(),
  expirationYY: Joi.number().length(2).required(),
});

module.exports = cardsSchema;
