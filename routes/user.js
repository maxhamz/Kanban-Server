const userRoute = require('express').Router()
const UserController = require('../controllers/user')


userRoute.post('/register', UserController.register )
userRoute.post('/login', UserController.login)
userRoute.post('/googleLogin', UserController.googleLogin)
userRoute.get('/', UserController.fetchAll )

module.exports = userRoute