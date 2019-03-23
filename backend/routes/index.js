const express     = require('express'),
      router      = express.Router(),
      postgres    = require('../db/postgres/postgresSQLStrategy'),
      context     = require('../db/base/contextStrategy')

const contextDatabase = new context(new postgres())

contextDatabase.connect()

const UserModel   = require('../models/UserModel')
const CustomerModel   = require('../models/CustomerModel')
const StoreModel   = require('../models/StoreModel')

router.get('/', function (request, response) {
  response.send('E-Money API')
})

const users = require('./users')
const customers = require('./customers')
const stores = require('./stores')

router.use('/users', users(new UserModel(contextDatabase)))
router.use('/customers', customers(new CustomerModel(contextDatabase)))
router.use('/stores', stores(new StoreModel(contextDatabase)))

module.exports = router