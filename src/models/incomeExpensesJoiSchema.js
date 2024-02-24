const Joi = require("joi");

const cardsSchema = Joi.object({
  date: Joi.string().required(),
  amount: Joi.number().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = cardsSchema;
