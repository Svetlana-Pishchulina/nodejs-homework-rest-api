const handlers = require('../model/index')

const getContacts = async (req, res, next) => {
  const contacts = await handlers.listContacts()
  res.json({
    status: 'success',
    code: 200,
    message: 'contacts found',
    data: { result: contacts },
  })
}

module.exports = getContacts
