const express = require('express')
const ctrl = require('../../controllers/auth')
const { controllerWrapper } = require('../../middlewares')
const router = express.Router()

router.post('/signup', controllerWrapper(ctrl.register))
// router.post('/register', express.json(), controllerWrapper(ctrl.register))
router.post('/login', controllerWrapper(ctrl.login))
router.get('/logout', controllerWrapper(ctrl.logout))

module.exports = router
