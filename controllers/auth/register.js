const { BadRequest, Conflict } = require('http-errors')
// const bcrypt = require('bcryptjs')
const { User, joiSchemaUserRegister } = require('../../model').userModel

const register = async (req, res, next) => {
  const error = await joiSchemaUserRegister.validate(req.body).error
  if (error) {
    throw new BadRequest(error.message)
  }
  const {
    email,
    password,
    //  subscription
  } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  //   await User.create({
  //     password: hashPassword,
  //     email,
  //     // subscription
  //   })
  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
    data: {
      //   token: '',
      user: {
        email,
        subscription: newUser.subscription,
      },
    },
  })
  //   const newUser = await User.create(req.body)
  //   res.status(201).json({
  //     status: 'success',
  //     code: 201,
  //     message: 'contact was added',
  //     data: { result: newUser },
  //   })
}

// const findeOne = (filter) => {
//   return User.findeOne(filter)
// }

module.exports = register
