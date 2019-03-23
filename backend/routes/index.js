const express     = require('express'),
      router      = express.Router(),
      postgres    = require('../db/postgres/postgresSQLStrategy'),
      context     = require('../db/base/contextStrategy')

const contextDatabase = new context(new postgres())

contextDatabase.connect()

const UserModel   = require('../models/UserModel')

router.get('/', function (request, response) {
  response.send('Smart Jirau API');
});

const users = require('./users')

router.use('/users', users(new UserModel(contextDatabase)))

module.exports = router;