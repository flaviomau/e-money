const createRouter = (UserModel) => {
  const express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/UserController')(UserModel)
  router.post('/login', UserController.login.bind(UserController))
  return router
}

module.exports = createRouter