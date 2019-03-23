const createRouter = (CustomerModel) => {
  const express = require('express'),
    router = express.Router(),
    CustomerController = require('../controllers/CustomerController')(CustomerModel),
    middlewareAuth = require('../controllers/middlewareAuth')

  router.get('/', middlewareAuth, CustomerController.readAll.bind(CustomerController))  
  router.get('/:_id', middlewareAuth, CustomerController.readById.bind(CustomerController))
  router.get('/user/:_id', middlewareAuth, CustomerController.readByUserId.bind(CustomerController))
  router.post('/', middlewareAuth, CustomerController.create.bind(CustomerController))
  router.put('/:_id', middlewareAuth, CustomerController.update.bind(CustomerController))
  router.delete('/:_id', middlewareAuth, CustomerController.remove.bind(CustomerController))

  return router
}

module.exports = createRouter