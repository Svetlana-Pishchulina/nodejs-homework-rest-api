const { BadRequest, Conflict } = require('http-errors')
const { User, joiSchemaUserRegister } = require('../../model').userModel

const register = async (req, res, next) => {
  const error = await joiSchemaUserRegister.validate(req.body).error
  if (error) {
    throw new BadRequest(error.message)
  }
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
    data: {
      user: {
        email,
        subscription: newUser.subscription,
      },
    },
  })
}

module.exports = register
