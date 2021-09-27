const fs = require('fs/promises')

const path = require('path')
const contactsPath = path.join(__dirname, '../db/contacts.json')

const listContacts = require('./listContacts')

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const searchedContact = contacts.find(({ id }) => id === contactId)
  if (!searchedContact) {
    return null
  }
  const updatedContact = { ...searchedContact, ...body }
  const newContactsList = [...contacts, updatedContact]
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
  return updatedContact
}

module.exports = updateContact
