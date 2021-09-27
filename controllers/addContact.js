const handlers = require('../model/index')
const { BadRequest } = require('http-errors')
const validation = require('../validation/validation')

const addContact = async (req, res, next) => {
  const error = await validation.schemaAddContact.validate(req.body).error
  if (error) {
    throw new BadRequest(error.message)
  }
  const newUser = await handlers.addContact(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'contact was added',
    data: { result: newUser },
  })
}

module.exports = addContact
