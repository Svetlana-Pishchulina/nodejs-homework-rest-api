const { NotFound } = require('http-errors')
const { Contact } = require('../model')

const removeContact = async (req, res, next) => {
  const contactId = req.params.contactId
  const newContactsList = await Contact.findByIdAndRemove({ _id: contactId })
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
