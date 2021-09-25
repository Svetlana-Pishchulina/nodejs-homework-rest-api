const Joi = require('joi')

const schemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email().required(),

  phone: Joi.string()
    .required()
    .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
    .required(),
})

const schemaUdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  email: Joi.string().email().required().optional(),

  phone: Joi.string()
    .required()
    .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
    .optional(),
})

module.exports = { schemaAddContact, schemaUdateContact }
