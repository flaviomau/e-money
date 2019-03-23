const createRouter = (StoreModel) => {
    const express = require('express'),
      router = express.Router(),
      StoreController = require('../controllers/StoreController')(StoreModel),
      middlewareAuth = require('../controllers/middlewareAuth')
  
    router.get('/', middlewareAuth, StoreController.readAll.bind(StoreController))  
    router.get('/:_id', middlewareAuth, StoreController.readById.bind(StoreController))
    router.get('/user/:_id', middlewareAuth, StoreController.readByUserId.bind(StoreController))
    router.post('/', middlewareAuth, StoreController.create.bind(StoreController))
    router.put('/:_id', middlewareAuth, StoreController.update.bind(StoreController))
    router.delete('/:_id', middlewareAuth, StoreController.remove.bind(StoreController))
  
    return router
  }
  
  module.exports = createRouter