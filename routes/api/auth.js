const express = require('express')
const ctrl = require('../../controllers/auth')
const { controllerWrapper, authenticate } = require('../../middlewares')
const router = express.Router()

router.post('/signup', controllerWrapper(ctrl.register))
router.post('/login', controllerWrapper(ctrl.login))
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))
router.get('/current', authenticate, controllerWrapper(ctrl.current))

module.exports = router
