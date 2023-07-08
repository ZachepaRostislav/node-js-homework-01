const fs = require('fs').promises;
const path = require("path")
const { nanoid } = require('nanoid')
const contactsPath = path.join(__dirname, "contacts.json")


async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(data)
}

async function getContactById(contactId) {
  const contacts = await listContacts()
  const requestedContact = contacts.find(item => item.id === contactId)
  return requestedContact || null
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const contactIndex = contacts.findIndex(item => item.id === contactId)
  if (contactIndex === -1) {
    return null
  }
  const [contact] = contacts.splice(contactIndex, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contact
}

async function addContact(name, email, phone) {
  const contacts = await listContacts()
  const newContact = {
    id: nanoid(),
    name, email, phone,
  }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}