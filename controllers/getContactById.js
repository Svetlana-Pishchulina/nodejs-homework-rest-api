// const handlers = require('../model/index')
const { NotFound } = require('http-errors')
const { Contact } = require('../model')

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId
  const contact = await Contact.findOne({ _id: contactId })
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

module.exports = getContactById
