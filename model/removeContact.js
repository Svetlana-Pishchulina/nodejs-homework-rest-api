const fs = require('fs/promises')

const path = require('path')
const contactsPath = path.join(__dirname, '../db/contacts.json')

const listContacts = require('./listContacts')

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const newContactsList = contacts.filter(({ id }) => id !== contactId)
  if (contacts.length === newContactsList.length) {
    return null
  }
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
  return true
}

module.exports = removeContact
