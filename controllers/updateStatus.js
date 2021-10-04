const { Contact, joiSchemaUdateContact } = require('../model')
const { NotFound, BadRequest } = require('http-errors')

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params
  const { isFavorite = false } = req.params
  const { body } = req
  if (!body) {
    throw new BadRequest('missing field favorite')
  }
  const { error } = joiSchemaUdateContact.validate(body)
  if (error) {
    throw new BadRequest(error.message)
  }
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { isFavorite },
    { new: true }
  )
  if (result) {
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact added to favorite',
      data: { result },
    })
  } else {
    throw new NotFound(`Contact with id=#${contactId} not found`)
  }
}

module.exports = updateStatus
