const { Contact } = require('../model')

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find()
  res.json({
    status: 'success',
    code: 200,
    message: 'contacts found',
    data: { result: contacts },
  })
}

module.exports = getContacts
