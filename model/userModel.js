const { model, Schema } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const userShema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
)

userShema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userShema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}
const User = model('user', userShema)

const joiSchemaUserRegister = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
})

const joiSchemaUserUpdate = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
})

// const joiSchemaUserUpdate = Joi.object().keys({
//   subscription: Joi.string().valid('starter', 'pro', 'business'),
// })

module.exports = { User, joiSchemaUserRegister, joiSchemaUserUpdate }