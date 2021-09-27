const fs = require('fs/promises')

const path = require('path')
const contactsPath = path.join(__dirname, '../db/contacts.json')

const listContacts = require('./listContacts')

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const newUserId = contacts[contacts.length - 1].id + 1
  const newUser = { id: newUserId, name, email, phone }
  const newContactsList = [...contacts, newUser]
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
  return newUser
}

module.exports = addContact
