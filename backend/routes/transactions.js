const createRouter = (TransactionModel) => {
    const express = require('express'),
      router = express.Router(),
      TransactionController = require('../controllers/TransactionController')(TransactionModel),
      middlewareAuth = require('../controllers/middlewareAuth')
  
    router.get('/', middlewareAuth, TransactionController.readAll.bind(TransactionController))  
    router.get('/:_id', middlewareAuth, TransactionController.readById.bind(TransactionController))
    router.get('/wallet/:_id', middlewareAuth, TransactionController.readByWalletId.bind(TransactionController))
    router.get('/store/:_id', middlewareAuth, TransactionController.readByStoreId.bind(TransactionController))
    router.post('/', middlewareAuth, TransactionController.create.bind(TransactionController))
    router.put('/:_id', middlewareAuth, TransactionController.update.bind(TransactionController))
    router.delete('/:_id', middlewareAuth, TransactionController.remove.bind(TransactionController))
  
    return router
  }
  
  module.exports = createRouter