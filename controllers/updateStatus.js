const { Contact } = require('../model')
const { NotFound } = require('http-errors')

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params
  const { isFavorite = false } = req.params
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
