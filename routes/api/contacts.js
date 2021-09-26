const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')
const { controllerWrapper } = require('../../middlewares')

router.get('/', controllerWrapper(ctrl.getContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.patch('/:contactId', controllerWrapper(ctrl.updateContact))

module.exports = router
