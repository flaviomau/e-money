class TransactionController {
    constructor(TransactionModel) {
      this.model = TransactionModel
    }
  
    handleNotFound(data) {
      if (!data) {
        const err = new Error('Not Found in database')
        err.status = 404
        throw err
      }
      return data
    }
  
    readAll(request, response, next) {
      this.model.find({})
        .then(this.handleNotFound)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  
    readById(request, response, next) {
      const query = { id_transaction: request.params._id || null }
      this.model.findOne(query)
        .then(this.handleNotFound)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  
    readBytransactionId(request, response, next) {
      const query = { 'id_transaction': request.params._id || null }
      this.model.findOne(query)
        .then(this.handleNotFound)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }

    readByWalletId(request, response, next) {
        const query = { 'id_wallet': request.params._id || null }
        this.model.findOne(query)
          .then(this.handleNotFound)
          .then(function (data) {
            response.json(data)
          })
          .catch(next)
      }

    readByStoreId(request, response, next) {
        const query = { 'id_store': request.params._id || null }
        this.model.findOne(query)
          .then(this.handleNotFound)
          .then(function (data) {
            response.json(data)
          })
          .catch(next)
      }
  
    create(request, response, next) {
      const { transaction } = request.body
      this.model.create(transaction)
        .then(data => {        
          response.json(data)
        })
        .catch(next)
    }
  
    update(request, response, next) {
      const _id = request.params._id
      const { transaction } = request.body
      this.model.update(_id, transaction)
        .then(data => {
          response.json(data)
        })
        .catch(next)
    }
  
    remove(request, response, next) {
      const _id = request.params._id
      this.model.remove(_id)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  }
  
  module.exports = function (TransactionModel) {
    return new TransactionController(TransactionModel)
  }