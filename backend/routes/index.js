const express     = require('express'),
      router      = express.Router(),
      postgres    = require('../db/postgres/postgresSQLStrategy'),
      context     = require('../db/base/contextStrategy')

const contextDatabase = new context(new postgres())

contextDatabase.connect()

const UserModel   = require('../models/UserModel')
const CustomerModel   = require('../models/CustomerModel')
const StoreModel   = require('../models/StoreModel')
const WalletModel = require('../models/WalletModel')

const users = require('./users')
const customers = require('./customers')
const stores = require('./stores')
const wallets = require('./wallets')

router.use('/users', users(new UserModel(contextDatabase)))
router.use('/customers', customers(new CustomerModel(contextDatabase)))
router.use('/stores', stores(new StoreModel(contextDatabase)))
router.use('/wallets', wallets(new WalletModel(contextDatabase)))

router.get('/', function (request, response) {
  response.send('E-Money API')
})

module.exports = router