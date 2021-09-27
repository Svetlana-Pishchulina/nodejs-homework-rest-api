// const fs = require('fs/promises')

// const path = require('path')
// const contactsPath = path.join(__dirname, '../db/contacts.json')

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath, 'utf-8')
//   return JSON.parse(data)
// }

// const getContactById = async (contactId) => {
//   const contacts = await listContacts()
//   const searchedContact = contacts.find(({ id }) => id === contactId)
//   if (!searchedContact) {
//     return null
//   }
//   return searchedContact
// }

// const removeContact = async (contactId) => {
//   const contacts = await listContacts()
//   const newContactsList = contacts.filter(({ id }) => id !== contactId)
//   if (contacts.length === newContactsList.length) {
//     return null
//   }
//   await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
//   return true
// }

// const addContact = async ({ name, email, phone }) => {
//   const contacts = await listContacts()
//   const newUserId = contacts[contacts.length - 1].id + 1
//   const newUser = { id: newUserId, name, email, phone }
//   const newContactsList = [...contacts, newUser]
//   await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
//   return newUser
// }

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts()
//   const searchedContact = contacts.find(({ id }) => id === contactId)
//   if (!searchedContact) {
//     return null
//   }
//   const updatedContact = { ...searchedContact, ...body }
//   const newContactsList = [...contacts, updatedContact]
//   await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
//   return updatedContact
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
