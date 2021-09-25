const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')
// console.log(contactsPath)

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  // console.table(JSON.parse(data))
  return JSON.parse(data)
}
// listContacts()

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const searchedContact = contacts.find(({ id }) => id === contactId)
  if (!searchedContact) {
    return null
  }
  // console.table(searchedContact)
  return searchedContact
}
// getContactById(5)

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const newContactsList = contacts.filter(({ id }) => id !== contactId)
  if (contacts.length === newContactsList.length) {
    return null
  }
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
  // console.table(newContactsList)
  return true
}
// removeContact(3)

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const newUserId = contacts[contacts.length - 1].id + 1
  const newUser = { id: newUserId, name, email, phone }
  const newContactsList = [...contacts, newUser]
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
  // console.table(newContactsList)
  return newUser
}
// addContact({ name: 'a', email: 'sve@getMaxListeners.com', phone: '02315' })

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const searchedContact = contacts.find(({ id }) => id === contactId)
  if (!searchedContact) {
    return null
  }
  const updatedContact = { ...searchedContact, ...body }
  const newContactsList = [...contacts, updatedContact]
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
  // console.table(newContactsList)
  return updatedContact
}
// updateContact(11, {
//   name: 'b',
//   email: 'sve@getMaxListeners.com',
//   phone: '02315',
// })

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
