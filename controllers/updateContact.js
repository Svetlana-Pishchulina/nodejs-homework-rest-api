const handlers = require('../model/index')
const { NotFound, BadRequest } = require('http-errors')
const validation = require('../validation/validation')

const updateContact = async (req, res, next) => {
  const { error } = validation.schemaUdateContact.validate(req.body)

  if (error) {
    throw new BadRequest(error.message)
  }
  const contactId = req.params.contactId
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
module.exports = updateContact
