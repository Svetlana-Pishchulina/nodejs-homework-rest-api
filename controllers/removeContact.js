const handlers = require('../model/index')
const { NotFound } = require('http-errors')

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

module.exports = removeContact
