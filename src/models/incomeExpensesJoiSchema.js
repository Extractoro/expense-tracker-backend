const Joi = require("joi");

const cardsSchema = Joi.object({
  id: Joi.any().required(),
  date: Joi.date().required(),
  amount: Joi.number().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = cardsSchema;
  