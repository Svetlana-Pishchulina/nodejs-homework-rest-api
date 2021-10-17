const { Contact } = require('../../model').contactsModel

const getContacts = async (req, res, next) => {
  const { page = 1, limit = 10, favorite } = req.query
  const skip = Number(page) - 1
  const { _id } = req.user
  let contacts
  if (favorite) {
    contacts = await Contact.find({ owner: _id, favorite: favorite }, '', {
      skip: skip,
      limit: Number(limit),
    })
  } else {
    contacts = await Contact.find({ owner: _id }, '', {
      skip: skip,
      limit: Number(limit),
    })
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'contacts found',
    data: { result: contacts },
  })
}

module.exports = getContacts
