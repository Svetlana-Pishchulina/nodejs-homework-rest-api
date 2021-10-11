const { BadRequest } = require('http-errors')
const { Contact, joiSchemaAddContact } = require('../../model').productsModel

const addContact = async (req, res, next) => {
  const error = await joiSchemaAddContact.validate(req.body).error
  if (error) {
    throw new BadRequest(error.message)
  }
  const newContact = await Contact.create(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'contact was added',
    data: { result: newContact },
  })
}

module.exports = addContact
