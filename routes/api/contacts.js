const express = require('express')
const { NotFound, BadRequest } = require('http-errors')
const router = express.Router()
const handlers = require('../../model/index')
const validation = require('../../validation/validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await handlers.listContacts()
    res.json({
      status: 'success',
      code: 200,
      message: 'contacts found',
      data: { result: contacts },
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = Number(req.params.contactId)
    // console.log(contactId)
    const contact = await handlers.getContactById(contactId)
    if (!contact) {
      throw new NotFound(`Contact with id=#${contactId} not found`)
    }
    return res.json({
      status: 'success',
      code: 200,
      message: 'contact was found',
      data: { result: contact },
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = await validation.schemaAddContact.validate(req.body).error
    // const { name, email, phone } = req.body
    if (error) {
      throw new BadRequest(error.message)
    }
    const newUser = await handlers.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'contact was added',
      data: { result: newUser },
    })
  } catch (err) {}
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    // const contacts = await handlers.listContacts()
    const contactId = Number(req.params.contactId)
    const newContactsList = await handlers.removeContact(contactId)
    if (!newContactsList) {
      throw new NotFound(`Contact with id=#${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'success deleted',
    })
  } catch (err) {
    next(err)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { error } = validation.schemaUdateContact.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const contactId = Number(req.params.contactId)
    // const body = req.body

    const updatedContact = await handlers.updateContact(contactId, req.body)
    if (!updatedContact) {
      throw new NotFound(`Contact with id=#${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'file was updated',
      data: { result: updatedContact },
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
