class WalletController {
    constructor(WalletModel) {
      this.model = WalletModel
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
      const query = { id_wallet: request.params._id || null }
      this.model.findOne(query)
        .then(this.handleNotFound)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  
    readByCustomerId(request, response, next) {
      const query = { 'id_customer': request.params._id || null }
      this.model.findOne(query)
        .then(this.handleNotFound)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  
    create(request, response, next) {
      const { wallet } = request.body
      this.model.create(wallet)
        .then(data => {
          response.json(data)
        })
        .catch(next)
    }
  
    update(request, response, next) {
      const _id = request.params._id
      const { wallet } = request.body
      this.model.update(_id, wallet)
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
  
  module.exports = function (WalletModel) {
    return new WalletController(WalletModel)
  }