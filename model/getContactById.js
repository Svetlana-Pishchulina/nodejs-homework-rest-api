// const listContacts = require('./listContacts')

// const getContactById = async (contactId) => {
//   const contacts = await listContacts()
//   const searchedContact = contacts.find(({ id }) => id === contactId)
//   if (!searchedContact) {
//     return null
//   }
//   return searchedContact
// }

const Contact = require('../db/schemas')
const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId })
}
module.exports = getContactById
