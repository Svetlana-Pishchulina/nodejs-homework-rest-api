const listContacts = require('./listContacts')

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const searchedContact = contacts.find(({ id }) => id === contactId)
  if (!searchedContact) {
    return null
  }
  return searchedContact
}

module.exports = getContactById
