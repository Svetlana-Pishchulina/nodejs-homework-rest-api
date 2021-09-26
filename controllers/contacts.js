const handlers = require('../model/index')
const { NotFound, BadRequest } = require('http-errors')
const validation = require('../validation/validation')

const getContacts = async (req, res, next) => {
  const contacts = await handlers.listContacts()
  res.json({
    status: 'success',
    code: 200,
    message: 'contacts found',
    data: { result: contacts },
  })
}

const getContactById = async (req, res, next) => {
  const contactId = Number(req.params.contactId)
  const contact = await handlers.getContactById(contactId)
  if (!contact) {
    throw new NotFound(`Contact with id=#${contactId} not found`)
  }
  return res.json({
    status: 'success',
    code: 200,
    message: 'contact was found',
    data: { result: contact },
  })
}

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

const removeContact = async (req, res, next) => {
  const contactId = Number(req.params.contactId)
  const newContactsList = await handlers.removeContact(contactId)
  if (!newContactsList) {
    throw new NotFound(`Contact with id=#${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'success deleted',
  })
}

const updateContact = async (req, res, next) => {
  const { error } = validation.schemaUdateContact.validate(req.body)

  if (error) {
    throw new BadRequest(error.message)
  }
  const contactId = Number(req.params.contactId)
  const updatedContact = await handlers.updateContact(contactId, req.body)

  if (!updatedContact) {
    throw new NotFound(`Contact with id=#${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'file was updated',
    data: { result: updatedContact },
  })
}
module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
