const createRouter = (WalletModel) => {
    const express = require('express'),
      router = express.Router(),
      WalletController = require('../controllers/WalletController')(WalletModel),
      middlewareAuth = require('../controllers/middlewareAuth')
  
    router.get('/', middlewareAuth, WalletController.readAll.bind(WalletController))  
    router.get('/:_id', middlewareAuth, WalletController.readById.bind(WalletController))
    router.get('/customer/:_id', middlewareAuth, WalletController.readByCustomerId.bind(WalletController))
    router.post('/', middlewareAuth, WalletController.create.bind(WalletController))
    router.put('/:_id', middlewareAuth, WalletController.update.bind(WalletController))
    router.delete('/:_id', middlewareAuth, WalletController.remove.bind(WalletController))
  
    return router
  }
  
  module.exports = createRouter