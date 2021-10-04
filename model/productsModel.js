const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const Joi = require('joi')

// const codeRegexp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

const contactShema = new Schema(
  {
    name: {
      type: String,
      //   required: [true, 'Set name for contact'],
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
  //   { versionKey: false, timestamps: true }
)

const Contact = model('contacts', contactShema)

const joiSchemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email().required(),

  phone: Joi.string()
    .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
    .required(),

  favorite: Joi.boolean(),
})

const joiSchemaUdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),

  email: Joi.string().email().required().optional(),

  phone: Joi.string()
    .required()
    .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
    .optional(),

  favorite: Joi.boolean(),
})

module.exports = { Contact, joiSchemaAddContact, joiSchemaUdateContact }

// ___________
