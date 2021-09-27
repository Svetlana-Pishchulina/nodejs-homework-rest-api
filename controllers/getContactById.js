const handlers = require('../model/index')
const { NotFound } = require('http-errors')

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

module.exports = getContactById
