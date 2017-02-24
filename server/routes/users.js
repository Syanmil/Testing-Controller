var express = require('express')
var router = express.Router()
var UsersController = require('../controllers/UsersController.js')
var logic = require('../controllers/logic.js')

// ======= /api/users =====

router.get('/getstatus', UsersController.list)

router.get('/getstatus/:id', UsersController.show)

router.post('/register', UsersController.create)

router.put('/update/:id', UsersController.update)

router.delete('/delete/:id', UsersController.remove)

router.get('/:id/train', logic.training)

router.post('/login', UsersController.login)

router.put('/logout', UsersController.logout)

router.get('/:id/eat', logic.eating)

router.get('/:id/sleep', logic.sleeping)

router.get('/:id/drink', logic.drinking)

module.exports = router
